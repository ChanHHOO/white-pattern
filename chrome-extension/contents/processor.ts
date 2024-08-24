import $ from "jquery"

export function preprocess(className) {
    return $(`.${className}`)
            .removeAttr("data-first-retail-purchaser")
            .removeAttr("data-register-rocket-pay")
            .removeAttr("data-register-pay-method-url")
            .removeAttr("data-is-payment-failure-on-hold-member")
            .removeAttr("data-is-add-card")
            .removeAttr("data-is-agreement-registered")
            .removeAttr("data-eats-confidential-info-update")
            .removeAttr("data-eats-benefit-duration")
            .removeAttr("data-source-app")
            .removeAttr("data-loyalty-fee")
            .removeAttr("data-fee-change-cancel-ab-group-p15")
            .removeAttr("data-next-recurring-date")
            .removeAttr("data-rejoin")
            .parent()
            .html()
}
