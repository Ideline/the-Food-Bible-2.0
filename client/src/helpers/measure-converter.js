export default {
    convertMeasure: function (ingredient) {
        if (ingredient.displayMeasure === "g" && ingredient.displayAmount >= 1000) {
            ingredient = this.convertToKilo(ingredient);
        }
        if (ingredient.displayMeasure === "krm" && ingredient.displayAmount >= 5) {
            ingredient = this.convertToTableSpoon(ingredient);
        }
        if (ingredient.displayMeasure === "tsk" && ingredient.displayAmount >= 3) {
            ingredient = this.convertToTableSpoon(ingredient);
        }
        if (ingredient.displayMeasure === "msk" && ingredient.displayAmount > 6.66) {
            ingredient = this.convertToDeciLiter(ingredient);
        }
        if (ingredient.displayMeasure === "dl" && ingredient.displayAmount >= 10) {
            ingredient = this.convertToLiter(ingredient);
        }
        return this.roundToNearestQuarter(ingredient);
    },
    convertToLiter: function (ingredient) {
        ingredient.displayAmount = ingredient.displayAmount / 10;
        ingredient.displayMeasure = "l";
        return ingredient;
    },
    convertToDeciLiter: function (ingredient) {
        ingredient.displayAmount = ingredient.displayAmount * 0.15;
        ingredient.displayMeasure = "dl";
        return ingredient;
    },
    convertToTableSpoon: function (ingredient) {
        ingredient.displayAmount = ingredient.displayAmount / 3;
        ingredient.displayMeasure = "msk";
        return ingredient;
    },
    convertToTeaSpoon: function (ingredient) {
        ingredient.displayAmount = ingredient.displayAmount / 5;
        ingredient.displayMeasure = "tsk";
        return ingredient;
    },
    convertToKilo: function (ingredient) {
        ingredient.displayAmount = ingredient.displayAmount / 1000;
        ingredient.displayMeasure = "kg";
        return ingredient;
    },
    roundToNearestQuarter: function (ingredient) {
        let amount = ingredient.displayAmount.toString();
        const DECIMAL_LENGTH = 2;

        if (amount.includes(".")) {
            amount = parseFloat(amount).toFixed(2).toString();
            const INDEX_OF_DECIMAL_POINT = amount.indexOf(".");
            const integer = amount.substr(0, INDEX_OF_DECIMAL_POINT);
            let decimals = parseInt(amount.substr(INDEX_OF_DECIMAL_POINT + 1, DECIMAL_LENGTH));
            if (decimals.toString().substr(0, 1) === "0" || decimals < 13) {
                ingredient.displayAmount = Math.round(ingredient.displayAmount);
                return ingredient;
            } else if (decimals < 38) {
                decimals = 25;
            } else if (decimals < 63) {
                decimals = 5;
            } else {
                decimals = 75;
            }
            ingredient.displayAmount = integer.concat("." + decimals);
            return ingredient;
        }
        return ingredient;
    }
}