(function($){   
    $(document).ready(() => {
        const urlParams = Object.fromEntries(
            new URLSearchParams(window.location.search)
        );

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let email;

        const toggleDemoInfoForm = () => {
            $(".demo-info-form-modal").toggleClass("show-modal");
            $("html").toggleClass("stop-scrolling");
        };

        // e.g. forwarded from chrome extension
        const { forwardedEmail } = urlParams;
        if (forwardedEmail) {
            window.hubspotutk = null;
            email = forwardedEmail;
            toggleDemoInfoForm();
        }

        const buttons = {
            "#bookDemoBtn": {
                emailInputId: "#bookDemoEmailInput",
                errorTooltipId: "#emailTooltip",
            },
            "#bookDemoBtn_1": {
                emailInputId: "#bookDemoEmailInput_1",
                errorTooltipId: "#emailTooltip_1",
            },
            "#bookDemoBtn_2": {
                emailInputId: "#bookDemoEmailInput_2",
                errorTooltipId: "#emailTooltip_2",
            },
        };

        const handleBookDemo = (btnId) => {
            const { emailInputId, errorTooltipId } = buttons[btnId];
            email = $(emailInputId).val();

            if (email.length < 1) {
                $(errorTooltipId).text('Please enter email address').show();
                return;
            }

            $.post({
                url: "https://sourcewhale.app/api/requests/get_demo_link",
                dataType: "json",
                data: JSON.stringify({
                    email,
                    timezone,
                    hubspotutk: window.hubspotutk,
                    urlParams,
                }),
                success: (res) => {
                if (res.url) window.location = res.url;
                    else toggleDemoInfoForm();
                },
                error: (res) => {
                    $(errorTooltipId).text(res.responseJSON.message).show();
                },
            });
        };

        Object.keys(buttons).forEach((btnId) => {
            $(btnId).click(() => handleBookDemo(btnId));
            $(buttons[btnId].emailInputId).keyup((e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    handleBookDemo(btnId);
                }
            });
        });

        $(".demo-info-form").on("submit", (e) => {
            if ($(".demo-info-form").valid()) {
                const company = {
                name: $("#companyNameInput").val(),
                type: $("#companyTypeSelect").val(),
                size: $("#companySizeSelect").val(),
                };

                $.post({
                url: "https://sourcewhale.app/api/requests/get_demo_link",
                dataType: "json",
                data: JSON.stringify({
                    company,
                    email,
                    timezone,
                    hubspotutk: window.hubspotutk,
                    urlParams,
                }),
                success: (res) => {
                    console.log(res);
                    window.location = res.url;
                },
                });
                $("button.submit-form").addClass("disabled");
                e.preventDefault();
            }
        });

        $(".open-modal-button, .close-form-btn").click(() => {
            toggleDemoInfoForm();
        });
    });
})(jQuery);