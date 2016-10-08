# Sailthru Campaign Extractor

A Sailthru Extractor for Keboola Connection is a component that extracts data from Sailthru Reporting API and downloads aggregated campaigns. Written in Node.js with utilization of Babel/ES6/ES7 functionality.

## General overview

The main purpose of this extractor is to download data from [Sailthru Reporting API - blasts](https://getstarted.sailthru.com/new-for-developers-overview/reporting/stats/). You can specify the date range which produce results for the metrics that are available in the Sailthru Reporting API for blasts datasets.

## Datasets

There are 11 datasets which are downloaded from the blasts endpoint and parsed. Each dataset is stored in separated file and created as new object in Keboola Storage. In a nutshell, there are following (11) objects available:  

* overall_summary - this is basically file which contains top aggregated results.
* beacon_times - aggregated file which pulling information about when a particular blast was opened.
* click_times - aggregated file which pulling information about when links were clicked.
* click_maps - aggregated file which pulling click maps information.
* devices - aggregated file which pulling information based on the number of clicks by device.
* domains - aggregated file which pulling information based on recipients’ email domains.
* engagement - aggregated file which pulling information based on levels of engagement.
* signups - aggregated file which pulling information based on signup dates.
* subjects - aggregated file which pulling information based on subject lines.
* topusers - aggregated file which pulling information based on the top users based on clicks, opens and purchases.
* urls - aggregated file which pulling information based on the urls.

For more information, please check out the [official documentation](https://getstarted.sailthru.com/new-for-developers-overview/reporting/stats/).

## Configuration

It's very straightforward to configure this extractor. There are only few simple parameters.

    {
      "#apiKey": "Sailthru api key",
      "#apiSecret": "Sailthru api secret",
      "startDate": "campaign start date (YYYY-MM-DD)",
      "endDate": "campaign end date (YYYY-MM-DD)",
      "convertTimestampToDate": true|false
    }

### Api keys (#apiKey + #apiSecret)

Check out your Sailthru account and get these parameters from your user profile.

### Dates

There are two date parameters, **startDate** and **endDate**. They help you to download aggregated data within specified date range. Keep in mind, that the date mask **YYYY-MM-DD** must be specified, otherwise the extractor won't recognize the input date and fail. The extractor always download full extract based on these two parameters. There are optionals and if you don't specify them, some default values will be used. For the **startDate** the value is going to be set to **2016-01-01** and for **endDate** the default settings is **today() - 1**.

### Bucket name and table name

For your convenience there is no need to specify bucketName + fileNames in the input configuration. All of it is handled automatically based on the configuration and downloaded files.

### Converting timestamps to dates

Datasets **beacon_times** and **click_times** are downloaded with timestamps in epoch form (unix timestamp) - number of seconds since 1970-01-01. You can keep these values by setting the parameter **convertTimestampToDate** to **false**, or you can set explicit to **true**, which converts these epochs into a human-readable time with format YYYY-MM-DD HH:mm:dd (UTC). If you don't specify this parameter, a default value true is applied and these dates are going to be converted into a human-readable form by default.  

### Sample configuration

A possible configuration in Keboola Connection might look like following:

    {
      "#apiKey": "abcd",
      "#apiSecret": "efgh",
      "startDate": "2016-01-01",
      "endDate": "2016-09-24",
      "convertTimestampToDate": true
    }
