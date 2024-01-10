import { request } from '@/utils';

export interface RemoveDynamicClassSettingReq {
  appId: string;
  id: string;
}

export async function removeDynamicClass(params: RemoveDynamicClassSettingReq) {
  const res = await request.post<boolean>('/webApi/config/dynamicClass/modify/REMOVE', params);
  return res.body;
}
