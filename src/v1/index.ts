import { Hono } from "hono";

import agencies from "./agencies";
import agencyMembers from "./agency-members";
import agencyReviews from "./agency-reviews";
import agencyServiceAreas from "./agency-service-areas";
import agencyVerifications from "./agency-verifications";
import auth from "./auth";
import billing from "./billing";
import contacts from "./contacts";
import hellov1 from "./hellov1";
import inquiries from "./inquiries";
import library from "./library";
import locations from "./locations";
import messages from "./messages";
import moderation from "./moderation";
import notifications from "./notifications";
import offices from "./offices";
import pointsOfInterest from "./points-of-interest";
import projectUnitTypes from "./project-unit-types";
import projects from "./projects";
import properties from "./properties";
import propertyCollections from "./property-collections";
import propertyMedia from "./property-media";
import propertyPrices from "./property-prices";
import propertyPromotions from "./property-promotions";

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
