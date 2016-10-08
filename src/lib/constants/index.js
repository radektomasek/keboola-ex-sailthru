// This file contains default constants of the application.
export const DATE_KEY = 'date_utc';
export const TIMESTAMP_KEY = 'timestamp';
export const IS_INCREMENTAL = false;
export const EVENT_ERROR = 'error';
export const EVENT_FINISH = 'finish';
export const DEFAULT_DATA_DIR = '/data';
export const CONFIG_FILE = 'config.json';
export const INPUT_TABLES_DIR = '/in/tables';
export const OUTPUT_TABLES_DIR = '/out/tables';
export const DEFAULT_START_DATE = '2016-01-01';
export const DEFAULT_DATE_MASK = 'YYYY-MM-DD';
export const DEFAULT_DATETIME_MASK = `${DEFAULT_DATE_MASK} HH:mm:ss`;
export const CONVERT_EPOCH_TO_DATE = true;

export const DEFAULT_DATASETS = {
  urls: 1, device: 1, signup: 1, domain: 1, subject: 1, banners: 1,
  clickmap: 1, topusers: 1, engagement: 1, click_times: 1,
  beacon_times: 1, purchase_items: 1, purchase_times: 1
};
export const DOMAINS_DEFAULT_VALUES = {
  count: 0, click_total: 0, click_multiple_urls: 0, open_total: 0,
  optout: 0, hardbounce: 0, softbounce: 0, view: 0, beacon: 0,
  confirmed_opens: 0, estopens: 0, click: 0, spam: 0
};
export const DEVICES_DEFAULT_VALUES = {
  count: 0, click_total: 0, click_multiple_urls: 0,
  open_total: 0, optout: 0, confirmed_opens: 0,
  estopens: 0, beacon: 0, click: 0,view: 0, softbounce: 0
};
export const ENGAGEMENT_DEFAULT_VALUES = {
  count: 0, click_total: 0, click_multiple_urls: 0, open_total: 0,
  hardbounce: 0, softbounce: 0, view: 0, name: 0,confirmed_opens: 0,
  estopens: 0, beacon: 0, click: 0, optout: 0, spam: 0
};
export const SIGNUPS_DEFAULT_VALUES = {
  count: 0, click_total: 0, click_multiple_urls: 0, open_total: 0,
  optout: 0, spam: 0, hardbounce: 0, softbounce: 0, view: 0,
  name: 0, confirmed_opens: 0, estopens: 0, beacon: 0, click: 0
};
export const SUBJECTS_DEFAULT_VALUES = {
  count: 0, click_total: 0, click_multiple_urls: 0,
  open_total: 0, optout: 0, hardbounce: 0, softbounce: 0,
  confirmed_opens: 0, estopens: 0, beacon: 0, click: 0
};
export const URL_DEFAULT_VALUES = {
  count: 0, click: 0, click_total: 0
};

// following constants are related to fileNames.
export const CAMPAIGN_OVERALL_SUMMARY = 'campaign_overall_summary.csv';
export const CAMPAIGN_BEACON_TIMES = 'campaign_beacon_times.csv';
export const CAMPAIGN_CLICK_MAPS = 'campaign_click_maps.csv';
export const CAMPAIGN_CLICK_TIMES = 'campaign_click_times.csv';
export const CAMPAIGN_DEVICES = 'campaign_devices.csv';
export const CAMPAIGN_DOMAINS = 'campaign_domains.csv';
export const CAMPAIGN_ENGAGEMENT = 'campaign_engagement.csv';
export const CAMPAIGN_SIGNUPS = 'campaign_signups.csv';
export const CAMPAIGN_SUBJECTS = 'campaign_subjects.csv';
export const CAMPAIGN_TOPUSERS = 'campaign_topusers.csv';
export const CAMPAIGN_URLS = 'campaign_urls.csv';

// keys for the data extraction
export const KEY_BEACON_TIMES = 'beacon_times';
export const KEY_CLICK_TIMES = 'click_times';
export const KEY_CLICK_MAPS = 'clickmap';
export const KEY_DOMAINS = 'domain';
export const KEY_DEVICES = 'device';
export const KEY_ENGAGEMENT = 'engagement';
export const KEY_SIGNUPS = 'signup';
export const KEY_SUBJECTS = 'subject';
export const KEY_TOP_USERS = 'topusers';
export const KEY_URLS = 'urls';
