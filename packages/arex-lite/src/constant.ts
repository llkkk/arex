import { MenusType } from 'arex-core';
export const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export const methodMap = {
  GET: {
    color: '#0cbb52',
  },
  PUT: {
    color: '#097bed',
  },
  POST: {
    color: '#ffb400',
  },
  DELETE: {
    color: '#eb2013',
  },
  PATCH: {
    color: '#212121',
  },
};

export enum NodeType {
  interface = 1,
  case = 2,
  folder = 3,
}

export const defaultActiveMenu = MenusType.ENVIRONMENT;
export const MAX_PANES_COUNT = 8;
