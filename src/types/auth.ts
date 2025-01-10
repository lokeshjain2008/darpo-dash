import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

export type EntityType = 'Organization' | 'Property' | 'Room' | 'Application';
export type Action = 'create' | 'read' | 'update' | 'delete';

export interface Permission {
  id: string;
  action: Action;
  entityType: EntityType;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface UserPermissions {
  roles: Role[];
  permissions: Permission[];
}