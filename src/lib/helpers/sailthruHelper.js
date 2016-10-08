import path from 'path';
import moment from 'moment';
import isThere from 'is-there';
import {
  first,
  isArray,
  isObject,
} from 'lodash';
import {
  DATE_KEY,
  TIMESTAMP_KEY,
  CONVERT_EPOCH_TO_DATE,
  DEFAULT_DATETIME_MASK
} from '../constants';
import {
  createOutputFile,
  createManifestFile
} from './keboolaHelper';

/**
 * This function extends object by date information
 */
export function extendObjectByDates(object, {startDate: start_date, endDate: end_date}) {
  return Object.assign({}, {start_date, end_date}, object);
}

/**
 * This function converts epoch into proper date.
 */
export function convertEpochToDate(timestamp, convert) {
  return convert
    ? moment(timestamp, 'X').utc().format(`${DEFAULT_DATETIME_MASK}`)
    : timestamp
}

/**
 * This function reads sailthruClient parameter and input configuration.
 * The result is a dataset contains all important information.
 */
export function downloadCampaignData(sailthruClient, params) {
  return new Promise((resolve, reject) => {
    sailthruClient.statsBlast(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * This function detects whether the input data are simple object or array
 * After the check is done, the particular element is extended by adding
 * startDate and endDate
 */
export function addStartDateAndEndDate(data, startDate, endDate) {
  return isArray(data)
    ? data.map(record => extendObjectByDates(record, {startDate, endDate}))
    : isObject(data)
    ? extendObjectByDates(data, {startDate, endDate })
    : {};
}

/**
 * This function extracts general summary from specified data.
 */
export function extractOverallSummary(data) {
  return Object.keys(data)
    .filter(attribute => !isObject(data[attribute]))
    .map(attribute => {
        return {[attribute]: data[attribute]}
    })
    .reduce((previous, current) => {
      const key = first(Object.keys(current));
      previous[key] = current[key];
      return previous;
    }, {});
}

/**
 * This function extracts aggregate (times) results (beacon times & click times).
 */
export function extractTimesDatasets(key, data, convertTimestamp = CONVERT_EPOCH_TO_DATE) {
  return Object
    .keys(data[key])
    .map(element => {
      const dateKey = convertTimestamp ? DATE_KEY : TIMESTAMP_KEY
      return {
        [dateKey]: convertEpochToDate(element, convertTimestamp),
        [key]: data[key][element]
      };
    });
}

/**
 * This function extracts aggregate object based on the key and if there is a situation
 * where value is not defined, assign 0 as a default one.
 */
export function extractDataGroups(key, data, defaultValues) {
  return Object
    .keys(data[key])
    .map(element => {
      return combineKeysWithObject(key, element, data[key][element], defaultValues);
    });
}

/**
 * This function combine keys with the specified object and make sure that
 * each key from default object is used, even the default value is used.
 */
export function combineKeysWithObject(parentKey, childKey, downloadedObject, defaultObject) {
  return Object
    .keys(defaultObject)
    .reduce((previous, current) => {
      return Object.assign(previous, {
        [current]: downloadedObject[current] || defaultObject[current]
      });
    }, {[parentKey]: childKey});
}

/**
 * This function reads input object and prepares array packed with promises.
 * Each of them is going to prepare a promise which is going to create a file.
 */
export function writeDataToFiles(dataOutDir, object) {
  return Object
    .keys(object)
    .map(fileName => {
      return createOutputFile(path.join(dataOutDir, fileName), object[fileName]);
    });
}

/**
 * This function iterate over array that cohtains fileNames and
 * verifies whether these files actually exist.
 */
export function doFilesExist(fileNames) {
  return fileNames.map(fileName => {
    return new Promise(resolve => {
      resolve({[fileName]: isThere(fileName)})
    });
  })
}


/**
 * This function iterates over array of fileNames and
 * keep fileNames from list which actually exist.
 * Existing file === value of the key is set to true.
 */
export function getExistingFiles(fileNames) {
  return fileNames
    .filter(file => file[first(Object.keys(file))])
    .map(fileName => first(Object.keys(fileName)));
}


/**
 * This function write manifest for specified array of files.
 */
export function writeDataToManifests(fileNames, data) {
  return fileNames.map(fileName => {
    createManifestFile(`${fileName}.manifest`, data);
  });
}
