import Link from "next/link";
import React from "react";
import {
  Text,
  Flex,
  Button,
  Grid,
  DropdownWrapper,
  Dropdown,
  DropdownOptions,
  RevealFx,
  Accordion,
} from "@/once-ui/components";

const FrequentlyAskedQuestion = () => {
  const features = [
    {
      title: "1. What kind of websites do you create?",
      features:
        "We specialize in modern, high-performance websites tailored to your brand’s unique style and needs. Our sites are designed to be fast, mobile-friendly, and visually engaging, ensuring a great user experience.",
    },

    {
      title: "2. How much does a website cost?",

      features:
        "Our pricing is straightforward, and we offer a one-time payment that includes a full year of hosting. Contact us for a personalized quote based on your specific requirements.",
    },
    {
      title: "3. How long does it take to build a website?",

      features:
        "The timeline depends on the website's complexity and your feedback. Typically, a small website can take 2-4 weeks, while larger, custom projects may take longer. ",
    },
    {
      title: "4. What features are included?",

      features:
        "All of our websites come with responsive design, basic SEO, fast load times, and a user-friendly content management system. We can also add e-commerce, blogs, and more, depending on your needs.",
    },
    {
      title: "5. Can I update the website myself?",

      features:
        "Absolutely! We build websites with easy-to-use content management systems (CMS) so that you can update content without technical skills. We provide a guide to help you get started.",
    },
    {
      title: "6. Do you offer website maintenance?",

      features:
        "Yes, we offer ongoing maintenance packages to keep your website updated, secure, and running smoothly. Reach out for details on our maintenance services.",
    },
    {
      title: "7. Can you redesign an existing website?",

      features:
        "Yes, we can help with website redesigns to give your site a fresh, modern look. We’ll work with your existing content or integrate new features if needed.",
    },
    {
      title: "8. Is SEO included?",

      features:
        "Basic SEO setup is included with every website. This ensures your site is optimized for search engines from day one. For advanced SEO, we offer additional packages tailored to your goals.",
    },
    {
      title: "9. What if I need help after the site goes live?",

      features:
        "We’re here to help even after launch! Our team offers support packages and is available to answer any questions you might have.",
    },
  ];

  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}
    >
      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        minHeight="0"
        maxWidth={68}
        direction="column"
        alignItems="center"
        flex={1}
      >
        {/* Main Header */}
        <Flex
          as="main"
          direction="column"
          justifyContent="center"
          fillWidth
          fillHeight
          padding="l"
          gap="l"
        ></Flex>
        {/* MoreInfo Cards */}
        <RevealFx>
          <Flex justifyContent="center" margin="8">
            <Text variant="body-strong-l" margin="20">
              Frequently Asked Questions
            </Text>
          </Flex>
          <Flex direction="column">
            {features.map((plan, index) => (
              <Accordion title={plan.title}>
                <Flex margin="4" gap="2">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {plan.features}
                  </Text>
                </Flex>
              </Accordion>
            ))}
          </Flex>
        </RevealFx>
      </Flex>

      {/* Footer */}
      <Flex
        as="footer"
        position="relative"
        fillWidth
        paddingX="l"
        paddingY="m"
        justifyContent="space-between"
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          <Link href="https://jsescobar.pro">© 2024 ColorMetta</Link>
        </Text>
        <Flex gap="12">
          <Button
            href="https://discord.gg/945vGxQV"
            prefixIcon="discord"
            size="s"
            variant="tertiary"
          >
            Discord
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FrequentlyAskedQuestion;
