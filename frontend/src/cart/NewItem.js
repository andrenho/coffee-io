import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, updateRecipes } from '../state/actions';

const mapStateToProps = state => {
    return { recipes: state.recipes };
}

function mapDispatchToProps(dispatch) {
    return {
        addItem: item => dispatch(addItem(item)),
        updateRecipes: () => dispatch(updateRecipes()),
    };
}

class NewItem extends Component {

    componentDidMount() {
        this.props.updateRecipes();
    }

    box(title, cost, description, button_function, button_text, button_outline, link) {
        const cost_element = cost ? <h1 className="card-title pricing-card-title">${cost}</h1> : <div></div>;
        const buttonClass = "btn btn-lg btn-block btn-" + (button_outline ? 'outline-' : '') + "primary mt-auto"
        return (
            <div className="card mb-4 box-shadow" key={"box_" + title}>
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{title}</h4>
                </div>
                <div className="card-body d-flex flex-column">
                    {cost_element}
                    <p>{description}</p>
                    <Link onClick={button_function} className={buttonClass} to={link}>
                        {button_text}
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        var boxes = [];
        if (this.props.recipes.length === 0) {
            boxes.push(this.box("Loading...", null, "Loading...", () => {}, "Please wait...", true, "/cart/newitem"));
        } else {
            for (const recipe of this.props.recipes) {
                boxes.push(this.box(recipe.recipeName, recipe.totalCost, recipe.description, 
                    () => this.props.addItem(recipe), "Add to cart", false, "/cart"));
            }
        }

        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <p className="lead">Please choose your drink.</p>
                </div>

                <div className="container">
                    <div className="card-deck mb-3 text-center">
                        {this.box("Customize", null, "Craft the perfect cup of coffee, just the way you like it.", 
                            () => {}, "Create from Scratch", true, "/cart/custom")}
                        {boxes}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

// vim:st=4:sts=4:sw=4:expandtab
