import { SearchOutlined } from '@ant-design/icons';
import { DiffJsonView, tryStringifyJson, useTranslation } from '@arextest/arex-core';
import { Button, Collapse, Descriptions, Input, Modal } from 'antd';
import React, { FC, useState } from 'react';

import { RecordResult } from '@/services/ReportService';

type CaseDetailTabProps = {
  type: string;
  hiddenValue?: boolean;
  compareResults?: RecordResult[];
};

const CaseDetailTab: FC<CaseDetailTabProps> = (props) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentDetail, setCurrent] = useState<RecordResult>();
  const { t } = useTranslation('components');

  const handleClose = () => {
    setDetailOpen(false);
  };
  return (
    <>
      <Collapse
        items={props.compareResults?.map((result, index) => ({
          key: index,
          label: (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {props.type === 'Servlet'
                  ? result.targetRequest.attributes.RequestPath
                  : result.operationName}
              </span>
              <Button
                size='small'
                type='text'
                icon={<SearchOutlined />}
                onClick={(e) => {
                  // avoid triggering collapse
                  e.stopPropagation();
                  setDetailOpen(true);
                  setCurrent(result);
                }}
              >
                {t('caseDetail.more')}
              </Button>
            </div>
          ),
          children: (
            <DiffJsonView
              readOnly
              height='400px'
              hiddenValue={props.hiddenValue}
              diffJson={{
                left: tryStringifyJson(result.targetRequest?.body),
                right: tryStringifyJson(result.targetResponse?.body),
              }}
              remarks={{
                left: t('request', { ns: 'common' }),
                right: t('response', { ns: 'common' }),
              }}
              onRenderContextMenu={() => false}
            />
          ),
        }))}
        style={{ marginTop: '8px' }}
      />
      <Modal
        width='70%'
        title={t('caseDetail.caseDetail')}
        open={detailOpen}
        style={{ top: 72 }}
        footer={null}
        onCancel={handleClose}
      >
        <Descriptions bordered>
          <Descriptions.Item span={4} label={t('caseDetail.recordId')}>
            {currentDetail?.recordId}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.operationName')}>
            {currentDetail?.operationName}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.categoryType')}>
            {currentDetail?.categoryType.name}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.recordVersion')}>
            {currentDetail?.recordVersion}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.requestSence')}>
            {decodeURIComponent(
              currentDetail?.targetRequest?.attributes?.Headers?.['x-sence'] || '',
            )}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.requestAction')}>
            {decodeURIComponent(
              currentDetail?.targetRequest?.attributes?.Headers?.['x-action'] || '',
            )}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.requestAttributes')}>
            <Input.TextArea
              readOnly
              autoSize={{ maxRows: 10 }}
              variant='borderless'
              value={tryStringifyJson(currentDetail?.targetRequest?.attributes, { prettier: true })}
            />
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.requestBodyType')}>
            {currentDetail?.targetRequest?.type}
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.responseAttributes')}>
            <Input.TextArea
              readOnly
              autoSize={{ maxRows: 10 }}
              variant='borderless'
              value={tryStringifyJson(currentDetail?.targetResponse?.attributes, {
                prettier: true,
              })}
            />
          </Descriptions.Item>

          <Descriptions.Item span={4} label={t('caseDetail.responseBodyType')}>
            {currentDetail?.targetResponse?.type}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default CaseDetailTab;
