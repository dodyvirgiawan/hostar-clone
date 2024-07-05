import { configureStoreWithMiddlewares } from './store';

export type AppStore = ReturnType<typeof configureStoreWithMiddlewares>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
