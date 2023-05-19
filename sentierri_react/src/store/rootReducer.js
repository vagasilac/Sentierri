import { combineReducers } from 'redux';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import agentRelationsSlice from '../features/agentRelations/agentRelationsSlice';
// import rawMaterialsReducer from '../features/rawMaterials/rawMaterialSlice';
// import subCategoriesReducer from '../features/subCategories/subCategorySlice';
import supplierCategoriesReducer from '../features/supplierCategories/supplierCategoriesSlice';

const rootReducer = combineReducers({
  suppliers: suppliersReducer,
  categories: categoriesReducer,
  agentRelations: agentRelationsSlice,
  // rawMaterials: rawMaterialsReducer,
  // subCategories: subCategoriesReducer,
  supplierCategories: supplierCategoriesReducer,

});

export default rootReducer;