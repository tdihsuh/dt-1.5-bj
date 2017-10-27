/**
 * Created by lijinde on 2017/9/14.
 */

const state = {
    productList:[]
}
// getters
const getters = {
    productValue:state=> {
        let amount = 0;
        for (let product of state.productList) {
            amount += Number(product.price)
        }
        console.log(amount)
        return {
            size: state.productList.length,
            amount
        }
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    add(state,product){
        state.productList.push(product)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}