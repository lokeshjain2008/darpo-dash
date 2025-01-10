import { useCallback } from 'react';
import { useAuth } from './use-auth';
import type { EntityType, Action } from '@/types/auth';

export function usePermissions() {
  const { permissions } = useAuth();

  const can = useCallback(
    (action: Action, entityType: EntityType, entityId?: string) => {
      if (!permissions) return false;

      // Check if user has the specific permission
      const hasPermission = permissions.some(
        (permission) =>
          permission.action === action && permission.entityType === entityType
      );

      // If there's an entityId, check if user has access to that specific entity
      if (entityId && hasPermission) {
        // Check organization-level permissions
        if (entityType === 'Organization') {
          return permissions.orgRoles.some(
            (role) => role.organizationId === entityId
          );
        }

        // Check property-level permissions
        if (entityType === 'Property') {
          return permissions.propertyRoles.some(
            (role) => role.propertyId === entityId
          );
        }
      }

      return hasPermission;
    },
    [permissions]
  );

  const hasRole = useCallback(
    (roleId: string, organizationId?: string) => {
      if (!permissions) return false;

      // Check application-level roles
      const hasAppRole = permissions.appRoles.some(
        (role) => role.id === roleId
      );

      if (hasAppRole) return true;

      // If organizationId is provided, check organization-specific roles
      if (organizationId) {
        return permissions.orgRoles.some(
          (role) =>
            role.id === roleId && role.organizationId === organizationId
        );
      }

      return false;
    },
    [permissions]
  );

  const getEntityPermissions = useCallback(
    (entityType: EntityType, entityId: string) => {
      if (!permissions) return [];

      let roles = [];

      // Get roles based on entity type
      if (entityType === 'Organization') {
        roles = permissions.orgRoles.filter(
          (role) => role.organizationId === entityId
        );
      } else if (entityType === 'Property') {
        roles = permissions.propertyRoles.filter(
          (role) => role.propertyId === entityId
        );
      }

      // Collect all permissions from the roles
      const entityPermissions = roles.flatMap((role) => role.permissions);

      return entityPermissions;
    },
    [permissions]
  );

  return {
    can,              // Check if user has permission for an action
    hasRole,          // Check if user has a specific role
    getEntityPermissions, // Get all permissions for a specific entity
    permissions,      // Raw permissions data
  };
}

// Example usage:
/*
  const { can, hasRole } = usePermissions();

  // Check if user can create an organization
  if (can('create', 'Organization')) {
    // Show create organization button
  }

  // Check if user can edit a specific property
  if (can('update', 'Property', propertyId)) {
    // Show edit property form
  }

  // Check if user has admin role for an organization
  if (hasRole('admin', organizationId)) {
    // Show admin controls
  }
*/