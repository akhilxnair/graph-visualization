import type { GraphData } from '../types/graph';

export const sampleData: GraphData = {
  nodes: [
    { id: 'cloud', label: 'Cloud', type: 'cloud', alerts: 760, misconfigs: 43, children: ['aws1', 'aws2', 'aws3', 'aws4', 'gcp1', 'gcp2', 'saas1', 'saas2'] },
   
    // AWS accounts
    { id: 'aws1', label: 'AWS 1', type: 'aws', alerts: 90, misconfigs: 5, children: ['s3-1', 'rds-1', 'ec2-1'] },
    { id: 'aws2', label: 'AWS 2', type: 'aws', alerts: 80, misconfigs: 4, children: ['s3-2', 'rds-2'] },
    { id: 'aws3', label: 'AWS 3', type: 'aws', alerts: 120, misconfigs: 8, children: ['s3-3', 'rds-3', 'lambda-3'] },
    { id: 'aws4', label: 'AWS 4', type: 'aws', alerts: 100, misconfigs: 6, children: ['s3-4', 'rds-4', 'ecs-4'] },

    // GCP accounts
    { id: 'gcp1', label: 'GCP 1', type: 'gcp', alerts: 60, misconfigs: 7, children: ['cloudsql-1', 'storage-1'] },
    { id: 'gcp2', label: 'GCP 2', type: 'gcp', alerts: 65, misconfigs: 6, children: ['cloudrun-2', 'pubsub-2', 'storage-2'] },

    // SaaS providers
    { id: 'saas1', label: 'SaaS 1', type: 'saas', alerts: 70, misconfigs: 2, children: ['zendesk-1', 'slack-1'] },
    { id: 'saas2', label: 'SaaS 2', type: 'saas', alerts: 50, misconfigs: 3, children: ['dropbox-2', 'notion-2'] },

    // AWS services
    { id: 's3-1', label: 'S3-1', type: 'service', alerts: 30, misconfigs: 2 },
    { id: 'rds-1', label: 'RDS-1', type: 'service', alerts: 25, misconfigs: 1 },
    { id: 'ec2-1', label: 'EC2-1', type: 'service', alerts: 35, misconfigs: 2 },

    { id: 's3-2', label: 'S3-2', type: 'service', alerts: 26, misconfigs: 2 },
    { id: 'rds-2', label: 'RDS-2', type: 'service', alerts: 22, misconfigs: 1 },

    { id: 's3-3', label: 'S3-3', type: 'service', alerts: 30, misconfigs: 3 },
    { id: 'rds-3', label: 'RDS-3', type: 'service', alerts: 20, misconfigs: 2 },
    { id: 'lambda-3', label: 'Lambda-3', type: 'service', alerts: 70, misconfigs: 3 },

    { id: 's3-4', label: 'S3-4', type: 'service', alerts: 25, misconfigs: 2 },
    { id: 'rds-4', label: 'RDS-4', type: 'service', alerts: 28, misconfigs: 1 },
    { id: 'ecs-4', label: 'ECS-4', type: 'service', alerts: 30, misconfigs: 3 },

    // GCP services
    { id: 'cloudsql-1', label: 'Cloud SQL', type: 'service', alerts: 20, misconfigs: 2 },
    { id: 'storage-1', label: 'Storage 1', type: 'service', alerts: 15, misconfigs: 1 },

    { id: 'cloudrun-2', label: 'Cloud Run', type: 'service', alerts: 25, misconfigs: 2 },
    { id: 'pubsub-2', label: 'Pub/Sub', type: 'service', alerts: 18, misconfigs: 1 },
    { id: 'storage-2', label: 'Storage 2', type: 'service', alerts: 22, misconfigs: 2 },

    // SaaS services
    { id: 'zendesk-1', label: 'Zendesk', type: 'service', alerts: 30, misconfigs: 0 },
    { id: 'slack-1', label: 'Slack', type: 'service', alerts: 40, misconfigs: 2 },

    { id: 'dropbox-2', label: 'Dropbox', type: 'service', alerts: 28, misconfigs: 1 },
    { id: 'notion-2', label: 'Notion', type: 'service', alerts: 22, misconfigs: 2 },
  ],
  edges: [
    // Cloud → Providers
    { source: 'cloud', target: 'aws1' },
    { source: 'cloud', target: 'aws2' },
    { source: 'cloud', target: 'aws3' },
    { source: 'cloud', target: 'aws4' },
    { source: 'cloud', target: 'gcp1' },
    { source: 'cloud', target: 'gcp2' },
    { source: 'cloud', target: 'saas1' },
    { source: 'cloud', target: 'saas2' },

    // AWS edges
    { source: 'aws1', target: 's3-1' },
    { source: 'aws1', target: 'rds-1' },
    { source: 'aws1', target: 'ec2-1' },

    { source: 'aws2', target: 's3-2' },
    { source: 'aws2', target: 'rds-2' },

    { source: 'aws3', target: 's3-3' },
    { source: 'aws3', target: 'rds-3' },
    { source: 'aws3', target: 'lambda-3' },

    { source: 'aws4', target: 's3-4' },
    { source: 'aws4', target: 'rds-4' },
    { source: 'aws4', target: 'ecs-4' },

    // GCP edges
    { source: 'gcp1', target: 'cloudsql-1' },
    { source: 'gcp1', target: 'storage-1' },

    { source: 'gcp2', target: 'cloudrun-2' },
    { source: 'gcp2', target: 'pubsub-2' },
    { source: 'gcp2', target: 'storage-2' },

    // SaaS edges
    { source: 'saas1', target: 'zendesk-1' },
    { source: 'saas1', target: 'slack-1' },

    { source: 'saas2', target: 'dropbox-2' },
    { source: 'saas2', target: 'notion-2' },
  ],
};
