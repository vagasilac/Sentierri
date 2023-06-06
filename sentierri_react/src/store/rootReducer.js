import { combineReducers } from 'redux';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import agentRelationsSlice from '../features/agentRelations/agentRelationsSlice';
// import rawMaterialsReducer from '../features/rawMaterials/rawMaterialSlice';
// import subCategoriesReducer from '../features/subCategories/subCategorySlice';
import UMReducer from '../features/UM/UMSlice';
import supplierCategoriesReducer from '../features/supplierCategories/supplierCategoriesSlice';
import customerReducer from '../features/customers/customersSlice';
import shopReducer from '../features/shops/shopsSlice';
import colorReducer from '../features/colors/colorsSlice';
import rawMaterialsReducer from '../features/rawMaterials/rawMaterialsSlice';

const rootReducer = combineReducers({
  suppliers: suppliersReducer,
  categories: categoriesReducer,
  agentRelations: agentRelationsSlice,
  customers: customerReducer,
  rawMaterials: rawMaterialsReducer,
  UM: UMReducer,
  supplierCategories: supplierCategoriesReducer,
  shops: shopReducer,
  colors: colorReducer,
});

export default rootReducer;