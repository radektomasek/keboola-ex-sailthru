'use strict';
import path from 'path';
import isThere from 'is-there';
import command from './lib/helpers/cliHelper';
import * as constants from './lib/constants';
import { createSailthruClient } from 'sailthru-client';
import {
  getConfig,
  parseConfiguration
} from './lib/helpers/keboolaHelper';
import {
  doFilesExist,
  getExistingFiles,
  writeDataToFiles,
  extractDataGroups,
  downloadCampaignData,
  extractTimesDatasets,
  composeExtractedData,
  writeDataToManifests,
  extractOverallSummary,
  addStartDateAndEndDate
} from './lib/helpers/sailthruHelper';

/**
 * This is the main part of the program.
 */
(async() => {
  // Prepares the data directories.
  const dataDir = command.data;
  const dataOutDir = path.join(dataDir, constants.OUTPUT_TABLES_DIR);
  try {
    // Read the input configuration.
    const {
      apiKey,
      endDate,
      startDate,
      apiSecret,
      incremental,
      sailthruCampaignParams,
      convertTimestampToDate
    } = await parseConfiguration(getConfig(path.join(dataDir, constants.CONFIG_FILE)));
    // Initialize Sailthru module.
    const sailthru = createSailthruClient(apiKey, apiSecret);
    // Download all campaigns data which are available in the Sailthru.
    const campaignDataset = await downloadCampaignData(sailthru, sailthruCampaignParams);
    // Extract all data and store the result in single object.
    const composedObject = {
      [constants.CAMPAIGN_OVERALL_SUMMARY]: addStartDateAndEndDate(extractOverallSummary(campaignDataset), startDate, endDate),
      [constants.CAMPAIGN_BEACON_TIMES]: extractTimesDatasets(constants.KEY_BEACON_TIMES, campaignDataset, convertTimestampToDate),
      [constants.CAMPAIGN_CLICK_TIMES]: extractTimesDatasets(constants.KEY_CLICK_TIMES, campaignDataset, convertTimestampToDate),
      [constants.CAMPAIGN_CLICK_MAPS]: addStartDateAndEndDate(campaignDataset[constants.KEY_CLICK_MAPS], startDate, endDate),
      [constants.CAMPAIGN_DOMAINS]: addStartDateAndEndDate(extractDataGroups(constants.KEY_DOMAINS, campaignDataset, constants.DOMAINS_DEFAULT_VALUES), startDate, endDate),
      [constants.CAMPAIGN_DEVICES]: addStartDateAndEndDate(extractDataGroups(constants.KEY_DEVICES, campaignDataset, constants.DEVICES_DEFAULT_VALUES), startDate, endDate),
      [constants.CAMPAIGN_ENGAGEMENT]: addStartDateAndEndDate(extractDataGroups(constants.KEY_ENGAGEMENT, campaignDataset, constants.ENGAGEMENT_DEFAULT_VALUES), startDate, endDate),
      [constants.CAMPAIGN_SIGNUPS]: extractDataGroups(constants.KEY_SIGNUPS, campaignDataset, constants.SIGNUPS_DEFAULT_VALUES),
      [constants.CAMPAIGN_SUBJECTS]: addStartDateAndEndDate(extractDataGroups(constants.KEY_SUBJECTS, campaignDataset, constants.SUBJECTS_DEFAULT_VALUES), startDate, endDate),
      [constants.CAMPAIGN_TOPUSERS]: addStartDateAndEndDate(campaignDataset[constants.KEY_TOP_USERS], startDate, endDate),
      [constants.CAMPAIGN_URLS]: addStartDateAndEndDate(extractDataGroups(constants.KEY_URLS, campaignDataset, constants.URL_DEFAULT_VALUES), startDate, endDate)
    };
    // Write all data into particular files.
    const files = await Promise.all(writeDataToFiles(dataOutDir, composedObject));
    // Check whether the input files exist (if some data was downloaded + written into the files).
    const verifiedFiles = getExistingFiles(await Promise.all(doFilesExist(files)));
    // Generate manifest for each particular file.
    const manifests = await Promise.all(writeDataToManifests(verifiedFiles, { incremental }));
    console.log(`Campaign data downloaded! ${manifests.length} objects created!`);
    process.exit(0);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
})();
