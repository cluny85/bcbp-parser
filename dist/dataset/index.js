'use strict';

var BCBPStandard = require('./BCBPStandard');
var paxStatusTypes = require('./paxStatusTypes');
var paxDetailsTypes = require('./paxDetailsTypes');
var sourceCheckinTypes = require('./sourceCheckinTypes');
var sourceBPIssuer = require('./sourceBPIssuer');
var documentTypes = require('./documentTypes');
var documentVerificationTypes = require('./documentVerificationTypes');
var classTypes = require('./classTypes');

module.exports = {
  BCBPStandard: BCBPStandard,
  paxStatusTypes: paxStatusTypes,
  paxDetailsTypes: paxDetailsTypes,
  sourceCheckinTypes: sourceCheckinTypes,
  sourceBPIssuer: sourceBPIssuer,
  documentTypes: documentTypes,
  documentVerificationTypes: documentVerificationTypes,
  classTypes: classTypes
};