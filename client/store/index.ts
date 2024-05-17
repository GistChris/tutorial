import { Context, MakeStore, createWrapper } from "next-redux-wrapper";
// import { Store, createStore } from "redux";
import { applyMiddleware, legacy_createStore as createStore} from 'redux'
import {reducer, RootState } from "./reducers";
import { ThunkDispatch, thunk } from "redux-thunk";

// // create a makeStore function
// const makeStore:MakeStore<RootState> = (context: Context) => createStore(rootReducer);

// // export an assembled wrapper
// export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

// create a makeStore function
const makeStore: MakeStore<RootState> = (context: Context) =>
  createStore(reducer,applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
export type NextThunkDispatch = ThunkDispatch<RootState,void,AnyAction,>
