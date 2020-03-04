const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();
const async = require("async");
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Mongo DB Connected"))
    .catch(err => console.log("Err is", err));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
//******MODELS****************//
const { User } = require("./models/user");
const { Brand } = require("./models/brand");
const { Wood } = require("./models/wood");
const { Product } = require("./models/product");
const { Payment } = require("./models/product");

//********Middleware***********//
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

//************PRODUCTS***********//
//Get products to shop filters
//Get by arrival
//items?sortBy=createdAt&order=desc&limit=4

// by sell
//items?sortyBy=sold&order=desc&limit100&skip=5

app.post("/api/product/shop", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    findArgs["publish"] = true;

    Product.find(findArgs)
        .populate("brand")
        .populate("wood")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles,
            });
        });
});

app.get("/api/products/items", (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find()
        .populate("brand")
        .populate("wood")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, items) => {
            if (err) return res.status(400).send(err);
            res.send(items);
        });
});

app.get("/api/product/item_by_id", (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(",");
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }
    Product.find({ _id: { $in: items } })
        .populate("brand")
        .populate("wood")
        .exec((err, docs) => {
            if (err) return res.status(400);
            res.status(200).send(docs);
        });
});

app.post("/api/product/item", auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            product: doc,
        });
    });
});

//***********WOODS*************//
app.post("/api/product/wood", auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            wood: doc,
        });
    });
});

app.get("/api/product/wood", (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(woods);
    });
});
//******Brands*****************//
app.post("/api/product/brand", auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            sucess: true,
            brand: doc,
        });
    });
});

app.get("/api/product/brands", (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    });
});
//********USERS*****************//

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
    });
});

app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            userdata: doc,
        });
    });
});

app.post("/api/users/login", (req, res) => {
    //find the email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Email not found",
            });
        //check the password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password",
                });
            //generate a token
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        message: "You are logged in",
                        x_auth: user.token,
                    });
            });
        });
    });
});

//************UPLOAD IMAGES**************** *//

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".png") {
            return cb(
                res.status(400).end("Only jpg and png are allowed!"),
                false
            );
        }
        cb(null, true);
    },
});
const upload = multer({ storage: storage }).single("file");

app.post("/api/users/uploadfile", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true });
    });
});

app.get("/api/users/admin_files", (req, res) => {
    const dir = path.resolve(".") + "/uploads";
    fs.readdir(dir, (err, items) => {
        return res.status(200).send(items);
    });
});

app.post("/api/users/uploadimage", formidable(), (req, res) => {
    cloudinary.uploader.upload(
        req.files.file.path,
        result => {
            res.status(200).send({
                public_id: result.public_id,
                url: result.url,
            });
        },
        {
            public_id: `${Date.now()}`,
            resource_type: "auto",
        }
    );
});

app.post("/api/users/add_toCart", auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;
        doc.cart.forEach(item => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        });
        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": mongoose.Types.ObjectId(req.query.productId),
                },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart);
                }
            );
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart);
                }
            );
        }
    });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
        { new: true },
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
            });

            Product.find({ _id: { $in: array } })
                .populate("brand")
                .populate("wood")
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart,
                    });
                });
        }
    );
});

app.post("/api/users/successBuy", auth, (req, res) => {
    let history = [];
    let transactionData = {};
    //enter user history
    req.body.cartDetail.forEach(item => {
        history.push({
            date: Date.now(),
            name: item.name,
            brand: item.brand,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
        });
    });
    // store payment info
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
    };
    transactionData.data = req.body.paymentData;
    transactionData.products = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity });
                });
                async.eachSeries(
                    products,
                    (item, callback) => {
                        Product.update(
                            { _id: item.id },
                            { $inc: { sold: item.quantity } },
                            { new: false },
                            callback
                        );
                    },
                    err => {
                        return res.json({ success: false, err });
                    }
                );
                res.status(200).json({
                    success: true,
                    cart: user.cart,
                    cartDetail: [],
                });
            });
        }
    );
});

app.post("/api/users/update_profile", auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            $set: req.body,
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false });
            return res.status(200).send({
                success: true,
            });
        }
    );
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: " " }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
        });
    });
});
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
