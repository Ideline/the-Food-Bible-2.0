export default {
    getNewRecipe: function () {
        return {
            id: "",
            title: "",
            ingredients: [],
            description: [],
            subCategories: [],
            nutritionValues: []
        }
    },

    getNewIngredient: function () {
        return {
            nutritionID: "",
            displayName: "",
            amountInGrams: "",
            displayAmount: "",
            defaultDisplayAmount: "",
            measure: ""
        }
    },

    getNewNutritionValues: function () {
        return [
            {
                name: "Energi (KJ)",
                short: "Enkj",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Energi (Kcal)",
                short: "Ener",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Protein (g)",
                short: "Prot",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Kolhydrater (g)",
                short: "Kolh",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Sockerarter (g)",
                short: "Mono/disack",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Fett (g)",
                short: "Fett",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Mättat fett (g)",
                short: "Mfet",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Fleromättat (g)",
                short: "Pole",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Enkelomättat (g)",
                short: "Mone",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Salt (g)",
                short: "NaCl",
                valuePerPortion: 0,
                totalValue: 0
            },
            {
                name: "Fiber (g)",
                short: "Fibe",
                valuePerPortion: 0,
                totalValue: 0
            },
        ]
    }
}