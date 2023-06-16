import { combineReducers } from 'redux';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subCategoriesReducer from '../features/subCategories/subCategoriesSlice';
import agentRelationsSlice from '../features/agentRelations/agentRelationsSlice';
import UMReducer from '../features/UM/UMSlice';
import supplierCategoriesReducer from '../features/supplierCategories/supplierCategoriesSlice';
import supplierMaterialsReducer from '../features/supplierMaterials/supplierMaterialsSlice';
import customerReducer from '../features/customers/customersSlice';
import shopReducer from '../features/shops/shopsSlice';
import colorReducer from '../features/colors/colorsSlice';
import rawMaterialsReducer from '../features/rawMaterials/rawMaterialsSlice';

const rootReducer = combineReducers({
  suppliers: suppliersReducer,
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  agentRelations: agentRelationsSlice,
  customers: customerReducer,
  rawMaterials: rawMaterialsReducer,
  UM: UMReducer,
  supplierCategories: supplierCategoriesReducer,
  supplierMaterials: supplierMaterialsReducer,
  shops: shopReducer,
  colors: colorReducer,
});

export default rootReducer;