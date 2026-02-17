/**
 * Admin Attributes Service - Combined service that delegates to specialized services
 * This file combines all attribute-related services for backward compatibility
 */

import { adminAttributesReadService } from "./admin-attributes-read.service";
import { adminAttributesWriteService } from "./admin-attributes-write.service";
import { adminAttributesDeleteService } from "./admin-attributes-delete.service";

class AdminAttributesService {
  // Delegate to specialized services
  
  // Read methods
  getAttributes = adminAttributesReadService.getAttributes.bind(adminAttributesReadService);

  // Write methods
  createAttribute = adminAttributesWriteService.createAttribute.bind(adminAttributesWriteService);
  updateAttributeTranslation = adminAttributesWriteService.updateAttributeTranslation.bind(adminAttributesWriteService);
  addAttributeValue = adminAttributesWriteService.addAttributeValue.bind(adminAttributesWriteService);
  updateAttributeValue = adminAttributesWriteService.updateAttributeValue.bind(adminAttributesWriteService);

  // Delete methods
  deleteAttribute = adminAttributesDeleteService.deleteAttribute.bind(adminAttributesDeleteService);
  deleteAttributeValue = adminAttributesDeleteService.deleteAttributeValue.bind(adminAttributesDeleteService);
}

export const adminAttributesService = new AdminAttributesService();
