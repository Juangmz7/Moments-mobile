import { EventDataSourceImpl } from "@/domain/infrastructure/datasources/event_datasource_impl";
import { EventRepositoryImpl } from "@/domain/infrastructure/repositories/event_repository_impl";
import { ApiServiceImpl } from "@/domain/services_impl/api_service_impl";

// Container for dependency injection
const apiService = new ApiServiceImpl();
const eventDataSource = new EventDataSourceImpl(apiService);
const eventRepository = new EventRepositoryImpl(eventDataSource);

export const container = {
  apiService,
  eventDataSource,
  eventRepository,
};
