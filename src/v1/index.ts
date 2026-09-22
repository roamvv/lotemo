import { Hono } from "hono";

import library from ".mod/account/library";
import messages from ".mod/account/messages";
import notifications from ".mod/account/notifications";
import moderation from ".mod/admin/moderation";
import agencies from ".mod/agencies/agencies";
import agencyMembers from ".mod/agencies/members";
import offices from ".mod/agencies/offices";
import agencyReviews from ".mod/agencies/reviews";
import agencyServiceAreas from ".mod/agencies/service-areas";
import agencyVerifications from ".mod/agencies/verifications";
import auth from ".mod/auth/auth";
import contacts from ".mod/contact/contacts";
import inquiries from ".mod/contact/inquiries";
import hellov1 from ".mod/hello/hellov1";
import billing from ".mod/payments/billing";
import projectUnitTypes from ".mod/properties/project-unit-types";
import projects from ".mod/properties/projects";
import properties from ".mod/properties/properties";
import propertyCollections from ".mod/properties/property-collections";
import propertyMedia from ".mod/properties/property-media";
import propertyPrices from ".mod/properties/property-prices";
import propertyPromotions from ".mod/properties/property-promotions";
import locations from ".mod/search/locations";
import pointsOfInterest from ".mod/search/points-of-interest";

export const v1 = new Hono({ strict: true }).basePath("/api/v1");

v1.route("/", auth);
v1.route("/", hellov1);

v1.route("/", agencies);
v1.route("/", agencyMembers);
v1.route("/", agencyReviews);
v1.route("/", agencyServiceAreas);
v1.route("/", agencyVerifications);
v1.route("/", billing);
v1.route("/", contacts);
v1.route("/", inquiries);
v1.route("/", library);
v1.route("/", locations);
v1.route("/", messages);
v1.route("/", moderation);
v1.route("/", notifications);
v1.route("/", offices);
v1.route("/", pointsOfInterest);
v1.route("/", projects);
v1.route("/", projectUnitTypes);
v1.route("/", properties);
v1.route("/", propertyCollections);
v1.route("/", propertyMedia);
v1.route("/", propertyPrices);
v1.route("/", propertyPromotions);

export default v1;
