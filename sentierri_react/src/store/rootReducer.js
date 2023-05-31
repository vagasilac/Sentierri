import { combineReducers } from 'redux';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import agentRelationsSlice from '../features/agentRelations/agentRelationsSlice';
// import rawMaterialsReducer from '../features/rawMaterials/rawMaterialSlice';
// import subCategoriesReducer from '../features/subCategories/subCategorySlice';
import supplierCategoriesReducer from '../features/supplierCategories/supplierCategoriesSlice';
import customerReducer from '../features/customers/customersSlice';
import shopReducer from '../features/shops/shopsSlice';

const rootReducer = combineReducers({
  suppliers: suppliersReducer,
  categories: categoriesReducer,
  agentRelations: agentRelationsSlice,
  customers: customerReducer,
  // rawMaterials: rawMaterialsReducer,
  // subCategories: subCategoriesReducer,
  supplierCategories: supplierCategoriesReducer,
  shops: shopReducer,
});

export default rootReducer;