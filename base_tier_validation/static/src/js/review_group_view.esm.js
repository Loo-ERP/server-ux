/** @odoo-module **/

import {registerModel} from "@mail/model/model_core";
import {one} from "@mail/model/model_field";

registerModel({
    name: "ReviewGroupView",
    recordMethods: {
        /**
         * @param {MouseEvent} ev
         */
        onClickFilterButton(ev) {
            this.reviewMenuViewOwner.update({isOpen: false});
            // Fetch the data from the button otherwise fetch the ones from the parent (.o_ActivityMenuView_activityGroup).
            const data = _.extend({}, $(ev.currentTarget).data(), $(ev.target).data());
            const context = {};

            this.env.services.action.doAction(
                {
                    context,
                    name: data.model_name,
                    res_model: data.res_model,
                    search_view_id: [false],
                    type: "ir.actions.act_window",
                    domain: [["can_review", "=", true]],
                    views: this.reviewGroup.irModel.availableWebViews.map(
                        (viewName) => [false, viewName]
                    ),
                },
                {
                    clearBreadcrumbs: true,
                }
            );
        },
    },
    fields: {
        reviewGroup: one("ReviewGroup", {
            identifying: true,
            inverse: "reviewGroupViews",
        }),
        reviewMenuViewOwner: one("ReviewerMenuView", {
            identifying: true,
            inverse: "reviewGroupViews",
        }),
    },
});
