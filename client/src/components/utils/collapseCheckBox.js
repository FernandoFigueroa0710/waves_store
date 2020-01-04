import React, { Component } from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondayAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckBox extends Component {
    state = {
        open: false,
        checked: [],
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState,
            });
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };
    handleIconSwitch = () =>
        this.state.open ? (
            <FontAwesomeIcon icon={faAngleUp} className="icon" />
        ) : (
            <FontAwesomeIcon icon={faAngleDown} className="icon" />
        );
    renderList = () =>
        this.props.list
            ? this.props.list.map(value => (
                  <ListItem key={value._id} style={{ padding: "10px 0" }}>
                      <ListItemText primary={value.name} />
                      <ListItemSecondayAction>
                          <Checkbox
                              color="primary"
                              onChange={() => this.handleToggle(value._id)}
                              checked={
                                  this.state.checked.indexOf(value._id) !== -1
                              }
                          />
                      </ListItemSecondayAction>
                  </ListItem>
              ))
            : null;

    handleToggle = value => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({ checked: newChecked }, () =>
            this.props.handlefilters(newChecked)
        );
    };

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: "1px solid #dbdbdd" }}>
                    <ListItem
                        onClick={this.handleClick}
                        style={{ padding: "10px 23px 10px 0" }}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleIconSwitch()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List conmponent="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseCheckBox;
