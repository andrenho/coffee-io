import React from 'react';

export default function Coffee(props) {
    function cup(props) {
        return <path 
            d="M 10 5 L 30 120 L 80 120 L 100 5" 
            stroke="black" strokeWidth="5" strokeLinecap="round" 
            fill="none"
        />;
    }

    function cupBackground(props) {
        return <path 
            d="M 10 5 L 30 120 L 80 120 L 100 5 L 110 5 L 110 130 L 5 130 L 5 5 Z" 
            stroke="none"
            fill="white"
        />;
    }

    function ingredient(color, level, size, key) {
        return <rect
            x={6} y={10 + (level - 1) * (110 / 4)} width={100} height={size * (110/4)}
            stroke="black" strokeWidth={0.5}
            fill={color}
            key={key}
        />;
    }

    function ingredients(props) {
        let ingredients = [];
        let level = 1;
        for (const i of props.cup.ingredients.filter(i => !i.unit)) {
            ingredients.push(ingredient(i.color, level, i.qtd, i.name + level));
            level += i.qtd;
        }
        return ingredients;
    }

    function names(props) {
        let texts = [];
        let level = 1;
        for (const i of props.cup.ingredients.filter(i => !i.unit)) {
            texts.push(<text x={110} y={30 + (level - 1) * (110 / 4)} key={i.name + level}>{i.name}</text>);
            level += i.qtd;
        }
        return texts;
    }

    let sz = 0.8;
    if (props.cup.size === "small")
        sz = 0.6;
    else if (props.cup.size === "large")
        sz = 1.0;
    const viewBox = props.simple ? "0 0 130 130" : "0 0 250 130";
    return (
        <svg width={props.width * sz} height={props.height * sz} viewBox={viewBox}>
            {ingredients(props)}
            {cupBackground(props)}
            {cup(props)}
            {props.simple ? <div></div> : names(props)}
        </svg>
    );
}

// vim:st=4:sts=4:sw=4:expandtab
