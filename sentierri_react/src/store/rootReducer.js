import { combineReducers } from 'redux';
import suppliersReducer from '../features/suppliers/suppliersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subCategoriesReducer from '../features/subCategories/subCategoriesSlice';
import agentRelationsSlice from '../features/agentRelations/agentRelationsSlice';
import UMReducer from '../features/UM/UMSlice';
import supplierCategoriesReducer from '../features/supplierCategories/supplierCategoriesSlice';
import modellColorsReducer from '../features/modellColors/modellColorsSlice';
import supplierMaterialsReducer from '../features/supplierMaterials/supplierMaterialsSlice';
import customerReducer from '../features/customers/customersSlice';
import shopReducer from '../features/shops/shopsSlice';
import colorReducer from '../features/colors/colorsSlice';
import modellReducer from '../features/modells/modellsSlice';
import modTypeReducer from '../features/modTypes/modTypesSlice';
import stageReducer from '../features/stages/stagesSlice';
import rawMaterialsReducer from '../features/rawMaterials/rawMaterialsSlice';
import fileUploadSlice from '../features/fileUpload/fileUploadSlice';

const rootReducer = combineReducers({
  fileUpload: fileUploadSlice,
  suppliers: suppliersReducer,
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  agentRelations: agentRelationsSlice,
  customers: customerReducer,
  rawMaterials: rawMaterialsReducer,
  UM: UMReducer,
  supplierCategories: supplierCategoriesReducer,
  modellColors: modellColorsReducer,
  supplierMaterials: supplierMaterialsReducer,
  shops: shopReducer,
  colors: colorReducer,
  modells: modellReducer,
  modTypes: modTypeReducer,
  stages: stageReducer
});

export default rootReducer;