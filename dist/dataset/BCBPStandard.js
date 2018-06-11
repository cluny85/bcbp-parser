"use strict";

var security_var = -1;

module.exports = {
  format_code: { length: 1, offset: 1, content: "S|M", explanation: "Format Code" },
  legs: { length: 1, offset: 2, content: "[1-4]", explanation: "Number of Legs Encoded" },
  passenger: { length: 20, offset: 22, content: "", explanation: "Passenger Name" },
  eticket: { length: 1, offset: 23, content: "E", explanation: "Electronic Ticket Indicator" },
  pnr: { length: 7, offset: 30, content: "", explanation: "Operating Carrier PNR Code" },
  origin: { length: 3, offset: 33, content: "", explanation: "From City Airport Code" },
  destination: { length: 3, offset: 36, content: "", explanation: "To City Airport Code" },
  airline: { length: 3, offset: 39, content: "", explanation: "Operating carrier Designator" },
  flight_number: { length: 5, offset: 44, content: "", explanation: "Flight Number" },
  flight_date: { length: 3, offset: 47, content: "[0-9]{3}", explanation: "Date of Flight (Julian Date)" },
  compartment_code: { length: 1, offset: 48, content: "[A-Z]", explanation: "Booking Class. Compartment Code" },
  seat: { length: 4, offset: 52, content: "", explanation: "Seat Number" },
  checkin_number: { length: 5, offset: 57, content: "", explanation: "Check-in Sequence Number" },
  // passenger_status -> getPassengerStatus
  passenger_status: { length: 1, offset: 58, content: "[0-9A-Z]", explanation: "Passenger Status" },
  conditional_size: { length: 2, offset: 60, content: "[0-F]{2}", explanation: "Field size of variable field (Conditional + Airline item 4)" },
  // Conditional -> hasConditionalFields
  init_version_number: { length: 1, offset: 61, content: "GREATER_THAN", explanation: "Beginning of version number" },
  version_number: { length: 1, offset: 62, content: "[1-5]", explanation: "Version number" },
  // conditionals_size -> size of next block
  conditionals_size: { length: 2, offset: 64, content: "[0-F]{2}", explanation: "Field size of following structured message - unique" },
  passenger_details: { length: 1, offset: 65, content: "[0-9A-Z\\s]", explanation: "Passenger Description" },
  source_checking: { length: 1, offset: 66, content: "[WKRMOTV\\s]", explanation: "Source of check-in" },
  boarding_pass_issue: { length: 1, offset: 67, content: "[WKXRMOTV\\s]", explanation: "Source of Boarding Pass Issuance" },
  date_pass_issue: { length: 4, offset: 71, content: "[0-9]{4}", explanation: "Date of Issue of Boarding Pass (Julian Date)" },
  document_type: { length: 1, offset: 72, content: "B|I", explanation: "Document Type" },
  airline_issuer: { length: 3, offset: 75, content: "", explanation: "Airline Designator of boarding pass issuer" },
  bagtag: { length: 13, offset: 88, content: "", explanation: "Baggage Tag License Plate Number (s)" },
  bagtag_first: { length: 13, offset: 101, content: "", explanation: "1st Non-Consecutive Baggage Tag License Plate Number" },
  bagtag_second: { length: 13, offset: 114, content: "", explanation: "2nd Non-Consecutive Baggage Tag License Plate Number" },
  repeated_conditionals: { length: 2, offset: 116, content: "[0-F]{2}", explanation: "Field size of following structured message - repeated" },
  airline_code: { length: 3, offset: 119, content: "[0-9]{3}", explanation: "Airline Numeric Code" },
  doc_serial_number: { length: 10, offset: 129, content: "", explanation: "Document Form/Serial Number" },
  selectee_indicator: { length: 1, offset: 130, content: "[\\s0-1]", explanation: "Selectee Indicator" },
  doc_verification: { length: 1, offset: 131, content: "[\\s0-2]", explanation: "International Document Verification" },
  marketing_carrier: { length: 3, offset: 134, content: "", explanation: "Marketing Carrier Designator" },
  frequent_flyer_airline: { length: 3, offset: 137, content: "", explanation: "Frequent Flyer Airline Designator" },
  frequent_flyer_number: { length: 16, offset: 153, content: "", explanation: "Frequent Flyer Number" },
  id_ad_indicator: { length: 1, offset: 154, content: "", explanation: "ID/AD Indicator" },
  baggage_allowance: { length: 3, offset: 157, content: "", explanation: "Free Baggage Allowance" },
  fast_track: { length: 1, offset: 158, content: "[YN\\s]", explanation: "Fast Track" },
  for_airline_use: { length: security_var, offset: 158 + security_var, content: "", explanation: "For individual airline use" },
  // Security
  init_of_security_data: { length: 1, offset: 159 + security_var, content: "CARET_OR_GREATER_THAN", explanation: "Beginning of security data" },
  type_of_security_data: { length: 1, offset: 160 + security_var, content: "", explanation: "Type of Security Data" },
  length_of_security_data: { length: 2, offset: 162 + security_var, content: "[0-F]{2}", explanation: "Length of Security Data" },
  security_data: { length: 100, offset: 262 + security_var, content: "", explanation: "Security Data" }
};