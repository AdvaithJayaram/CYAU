// Service Registry for Microservices Architecture
export interface ServiceConfig {
  name: string;
  url: string;
  healthCheck: string;
}

class ServiceRegistry {
  private services: Map<string, ServiceConfig> = new Map();

  register(service: ServiceConfig): void {
    this.services.set(service.name, service);
  }

  get(serviceName: string): ServiceConfig | undefined {
    return this.services.get(serviceName);
  }

  getAll(): ServiceConfig[] {
    return Array.from(this.services.values());
  }

  remove(serviceName: string): boolean {
    return this.services.delete(serviceName);
  }
}

export const serviceRegistry = new ServiceRegistry();

// Register core services
serviceRegistry.register({
  name: 'deals',
  url: process.env.DEALS_SERVICE_URL || 'http://localhost:3001',
  healthCheck: '/health',
});

serviceRegistry.register({
  name: 'users',
  url: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
  healthCheck: '/health',
});

serviceRegistry.register({
  name: 'notifications',
  url: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3003',
  healthCheck: '/health',
});