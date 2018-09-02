import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class Settings extends Component {
  state = {
    value: "female"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend"> Color</FormLabel>
          <RadioGroup
            aria-label="Color"
            name="Color1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="red" control={<Radio />} label="red" />
            <FormControlLabel value="green" control={<Radio />} label="green" />
            <FormControlLabel value="blue" control={<Radio />} label="blue" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
