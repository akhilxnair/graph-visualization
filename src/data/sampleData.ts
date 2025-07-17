import type { GraphData } from '../types/graph';

export const sampleData: GraphData = {
  nodes: [
    // Cloud (computed later)
    { id: 'cloud', label: 'Cloud Infra', type: 'cloud', alerts: 650, misconfigs: 33, children: ['aws-main', 'aws-logs', 'aws-backup', 'gcp-alpha', 'gcp-beta', 'saas-hub', 'saas-utils'] },

    // AWS accounts
    { id: 'aws-main', label: 'AWS Main', type: 'aws', alerts: 75, misconfigs: 3, children: ['s3-main', 'ec2-core', 'rds-prod'] },
    { id: 'aws-logs', label: 'AWS Logs', type: 'aws', alerts: 95, misconfigs: 6, children: ['s3-logs', 'cloudwatch'] },
    { id: 'aws-backup', label: 'AWS Backup', type: 'aws', alerts: 130, misconfigs: 10, children: ['s3-backup', 'rds-backup', 'glacier'] },

    // GCP accounts
    { id: 'gcp-alpha', label: 'GCP Alpha', type: 'gcp', alerts: 22, misconfigs: 2, children: ['bigquery', 'gcs-alpha'] },
    { id: 'gcp-beta', label: 'GCP Beta', type: 'gcp', alerts: 50, misconfigs: 4, children: ['cloudrun-beta', 'pubsub-beta', 'gcs-beta'] },

    // SaaS providers
    { id: 'saas-hub', label: 'SaaS Hub', type: 'saas', alerts: 68, misconfigs: 1, children: ['jira', 'zoom'] },
    { id: 'saas-utils', label: 'SaaS Utils', type: 'saas', alerts: 0, misconfigs: 0, children: ['dropbox', 'confluence'] },

    // AWS services
    { id: 's3-main', label: 'Main S3', type: 'service', alerts: 40, misconfigs: 1 },
    { id: 'ec2-core', label: 'Core EC2', type: 'service', alerts: 20, misconfigs: 1 },
    { id: 'rds-prod', label: 'RDS Prod', type: 'service', alerts: 15, misconfigs: 1 },

    { id: 's3-logs', label: 'Logs S3', type: 'service', alerts: 28, misconfigs: 3 },
    { id: 'cloudwatch', label: 'CloudWatch', type: 'service', alerts: 67, misconfigs: 3 },

    { id: 's3-backup', label: 'Backup S3', type: 'service', alerts: 35, misconfigs: 2 },
    { id: 'rds-backup', label: 'RDS Backup', type: 'service', alerts: 40, misconfigs: 3 },
    { id: 'glacier', label: 'Glacier', type: 'service', alerts: 55, misconfigs: 5 },

    // GCP services
    { id: 'bigquery', label: 'BigQuery', type: 'service', alerts: 10, misconfigs: 1 },
    { id: 'gcs-alpha', label: 'GCS Alpha', type: 'service', alerts: 12, misconfigs: 1 },

    { id: 'cloudrun-beta', label: 'Cloud Run Beta', type: 'service', alerts: 30, misconfigs: 2 },
    { id: 'pubsub-beta', label: 'Pub/Sub Beta', type: 'service', alerts: 20, misconfigs: 1 },
    { id: 'gcs-beta', label: 'GCS Beta', type: 'service', alerts: 0, misconfigs: 1 },

    // SaaS services
    { id: 'jira', label: 'Jira', type: 'service', alerts: 35, misconfigs: 1 },
    { id: 'zoom', label: 'Zoom', type: 'service', alerts: 33, misconfigs: 0 },

    { id: 'dropbox', label: 'Dropbox', type: 'service', alerts: 0, misconfigs: 0 },
    { id: 'confluence', label: 'Confluence', type: 'service', alerts: 0, misconfigs: 0 },
  ],
  edges: [
    { source: 'cloud', target: 'aws-main' },
    { source: 'cloud', target: 'aws-logs' },
    { source: 'cloud', target: 'aws-backup' },
    { source: 'cloud', target: 'gcp-alpha' },
    { source: 'cloud', target: 'gcp-beta' },
    { source: 'cloud', target: 'saas-hub' },
    { source: 'cloud', target: 'saas-utils' },

    // AWS edges
    { source: 'aws-main', target: 's3-main' },
    { source: 'aws-main', target: 'ec2-core' },
    { source: 'aws-main', target: 'rds-prod' },

    { source: 'aws-logs', target: 's3-logs' },
    { source: 'aws-logs', target: 'cloudwatch' },

    { source: 'aws-backup', target: 's3-backup' },
    { source: 'aws-backup', target: 'rds-backup' },
    { source: 'aws-backup', target: 'glacier' },

    // GCP edges
    { source: 'gcp-alpha', target: 'bigquery' },
    { source: 'gcp-alpha', target: 'gcs-alpha' },

    { source: 'gcp-beta', target: 'cloudrun-beta' },
    { source: 'gcp-beta', target: 'pubsub-beta' },
    { source: 'gcp-beta', target: 'gcs-beta' },

    // SaaS edges
    { source: 'saas-hub', target: 'jira' },
    { source: 'saas-hub', target: 'zoom' },

    { source: 'saas-utils', target: 'dropbox' },
    { source: 'saas-utils', target: 'confluence' },
  ],
};
