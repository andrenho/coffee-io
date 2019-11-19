import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, updateIngredients } from '../state/actions';
import Selector from './Selector';
import Coffee from './Coffee';

const mapStateToProps = state => {
    return { ingredients: state.ingredients };
}

function mapDispatchToProps(dispatch) {
    return {
        addItem: item => dispatch(addItem(item)),
        updateIngredients: () => dispatch(updateIngredients()),
    };
}

class Custom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: "medium",
            description: "Empty cup",
            ingredients: [],
            totalCost: 0.00,
        }
    }

    componentDidMount() {
        this.props.updateIngredients();
    }

    // 
    // LOGIC
    //

    resetCup() {
        this.setState({
            ingredients: [],
            totalCost: 0.0
        });
    }

    adjustQuantities = (ingredients) => {
        const count = ingredients.filter(i => !i.unit).length;
        switch (count) {
            case 0:
                return true;
            case 1:
                for (let i of ingredients)
                    if (!i.unit)
                        i.qtd = 4;
                return true;
            case 2:
                for (let i of ingredients)
                    if (!i.unit)
                        i.qtd = 2;
                return true;
            case 3:
                let f = false;
                for (let i of ingredients) {
                    if (!i.unit) {
                        if (!f) {
                            i.qtd = 2;
                            f = true;
                        } else {
                            i.qtd = 1;
                        }
                    }
                }
                return true;
            case 4:
                for (let i of ingredients)
                    if (!i.unit)
                        i.qtd = 1;
                return true;
            default:
                return false;
        }
    }

    calculateCost(ingredients) {
        let cost = 0.0;
        for (const i of ingredients)
            cost += (i.cost / 4.0 * i.qtd);
        cost = Math.floor(cost * 2) / 2;   // round values
        return cost;
    }

    createDescription(ingredients) {
        return ingredients.map(i => i.name).sort().join(", ");
    }

    addIngredient = (ingredient) => {
        let ingredients = [...this.state.ingredients, ingredient];
        if (!this.adjustQuantities(ingredients)) {
            console.log("Ingredient not added");
            console.log(ingredient);
            return;
        }

        this.setState({
            ingredients: ingredients,
            totalCost: this.calculateCost(ingredients),
            description: this.createDescription(ingredients),
        });
        console.log("Ingredient added.");
        console.log(ingredient);
    }

    sizeChanged = (s) => {
        this.setState({ size: s });
    }

    addItem = (e) => {
        if (this.state.ingredients.length > 0) {
            this.props.addItem(this.state);
        } else {
            alert("Choose at least one ingredient.");
            e.preventDefault();
        }
    }

    // 
    // RENDERING
    //

    keys() {
        // organize order of keys
        let s = new Set();
        for (let ing of this.props.ingredients)
            if (ing.type !== "Coffee")
                s.add(ing.type);
        let types = Array.from(s);
        types.sort();
        types.unshift("Coffee");
        return types;
    }

    sizeSelector() {
        return [
            { name: "Small", value: "small" },
            { name: "Medium", value: "medium" },
            { name: "Large", value: "large" },
        ];
    }

    render() {
        const ingSelectors = this.keys().map(key => {
            const ingredients = this.props.ingredients.filter(i => i.type === key).map(i => ({
                name:       i.name, 
                value:      i, 
                color:      i.color, 
                lightColor: i.lightColor,
                dropdown:   i.unit ? [1, 2, 3, 4].map(j => ({ name: j + " " + i.unit, value: Object.assign(i, { qtd: j }) })) : null
            }));
            return <Selector name={key} buttons={ingredients} onSelected={(i) => this.addIngredient(i)} key={key} />;
        });
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <p className="lead">Craft your perfect cup of coffee. Click on the buttons below to add the ingredients.</p>
                </div>
                <div className="container m-3">
                    <Selector selector name="Cup size" buttons={this.sizeSelector()} onSelected={(size) => this.sizeChanged(size)} selected={2} />
                    <hr />
                    <div className="row">
                        <div className="col">
                            <p>Click to add the ingredients:</p>
                            {ingSelectors}
                        </div>
                        <div className="col my-auto ml-4">
                            <div className="row mx-auto"><Coffee cup={this.state} width={300} height={200}/></div>
                            <div className="row ml-3"><button type="button" className="btn btn-danger" onClick={() => this.resetCup()}>Reset</button></div>
                        </div>
                    </div>
                    <hr />
                    <div className="btn-group mb-2">
                        <Link className="btn btn-danger" to="/cart">Cancel item</Link>
                        <Link
                            className="btn btn-primary"
                            onClick={e => this.addItem(e)}
                            to="/cart"
                        >Add item: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(this.state.totalCost)}</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Custom);

// vim:st=4:sts=4:sw=4:expandtab
