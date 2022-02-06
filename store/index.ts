import { Module, MutationMethod } from 'vuex';
import { RootState } from '../RootState'
import { fullListOfProducts } from '../mockData'

const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART'
const SET_ACTIVE_PRODUCT_CATEGORY = 'SET_ACTIVE_PRODUCT_CATEGORY'

export type ShoppingCartProduct = Product & {quantity: number}

export interface ShoppingCartState {
  shoppingCartProducts: ShoppingCartProduct[],
}
export interface CategoryPageState {
  allProducts: Product[],
  activeProductCategory: String
}
export interface State extends ShoppingCartState, CategoryPageState {}

export const state = ():State => ({
  shoppingCartProducts: [],
  allProducts: fullListOfProducts,
  activeProductCategory: ''
})

export type GetterTreeAdaptor<Type, State, RootState> = {
  [Key in keyof Type]: (state: State, getters: any, rootState: RootState, rootGetters: any) => Type[Key];
}

//https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
//https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
//node_modules/vuex/types/helpers.d.ts
export type MutationTreeAdaptor<Type extends Record<string, MutationMethod>, State> = {
  [Key in keyof Type]: (s: State, ...p: Parameters<Type[Key]>) => ReturnType<Type[Key]>
}

export interface Getters {
  categoryProducts: Product[]
}

export type AddToShoppingCartMutationType = {
  [ADD_TO_SHOPPING_CART]: (product:Product) => void,
}
export type RemoveFromCartMutationType = {
  [REMOVE_FROM_SHOPPING_CART]: (productId:String) => void,
}
export type SetActiveProductCategory = {
  [SET_ACTIVE_PRODUCT_CATEGORY]: (categoryName: String) => void
}
export type CategoryPageMutations = AddToShoppingCartMutationType & SetActiveProductCategory
export type ShoppingCartMutations = AddToShoppingCartMutationType & RemoveFromCartMutationType
export type Mutations = AddToShoppingCartMutationType & RemoveFromCartMutationType & SetActiveProductCategory

export const getters: GetterTreeAdaptor<Getters, State, RootState> = {
  categoryProducts(state: State):Product[] {
    return state.allProducts.filter(product => product.category === state.activeProductCategory)
  }
}

export const mutations: MutationTreeAdaptor<Mutations, State> = {
  [SET_ACTIVE_PRODUCT_CATEGORY](state, categoryName):void {
    state.activeProductCategory = categoryName
  },
  [ADD_TO_SHOPPING_CART](state, product):void {
    const productAlreadyInShoppingCart = state.shoppingCartProducts.find((shoppingCartProduct: ShoppingCartProduct): Boolean => shoppingCartProduct.id === product.id)
    if(!!productAlreadyInShoppingCart) {
      productAlreadyInShoppingCart.quantity++
    } else {
      const newShoppingCartProduct:ShoppingCartProduct = {
        ...product,
        quantity: 1
      }
      state.shoppingCartProducts = [...state.shoppingCartProducts, newShoppingCartProduct]
    }
  },
  [REMOVE_FROM_SHOPPING_CART](state,productId):void {
    state.shoppingCartProducts = state.shoppingCartProducts.reduce((newShoppingCartProducts:ShoppingCartProduct[], shoppingCartProduct:ShoppingCartProduct):ShoppingCartProduct[] => {
      if(shoppingCartProduct.id === productId) {
        if(shoppingCartProduct.quantity === 1) {
          return newShoppingCartProducts.filter((product:ShoppingCartProduct) => product.id !== shoppingCartProduct.id)
        } else {
          return newShoppingCartProducts.map((product:ShoppingCartProduct) => {
            if(product.id === shoppingCartProduct.id) {
              return { ...product, quantity: product.quantity - 1}
            } else {
              return product
            }
          })
        }
      } else {
        return newShoppingCartProducts
      }
    }, state.shoppingCartProducts)
  }
}

