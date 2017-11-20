import { createStore, applyMiddleware, compose, GenericStoreEnhancer, combineReducers } from 'redux';
import { IAppState } from './IAppState';
import { freezeState } from './freezeState';
import { calcReducer } from '@app/calculator/state/calculator.reducer';

declare var window: any;

const devToolsExtension: GenericStoreEnhancer = window.devToolsExtension ? window.devToolsExtension() : f => f;

export const store = createStore<IAppState>(
  combineReducers({ calcReducer }),
  compose(applyMiddleware(freezeState), devToolsExtension) as GenericStoreEnhancer
);
