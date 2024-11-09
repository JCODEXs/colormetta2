import React from "react";
import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Logo,
  Background,
  LetterFx,
  SmartImage,
  RevealFx,
} from "@/once-ui/components";

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Basic Plan",
      description: "A simple plan to get you started",
      price: "$290",
      features: ["1 Main Page", "Basic Info Section", " Responsive Layout"],
      buttonText: "know more",
      buttonRedirectionUrl: "/moreinfo/1",
    },
    {
      title: "Plus Plan",
      description: "Add more pages like About, History, etc.",
      price: "$480",
      features: [
        "Up to 5 Pages",
        "About, History, Contact",
        " Responsive Layout",
      ],
      buttonText: "know more",
      buttonRedirectionUrl: "/moreinfo/2",
    },
    {
      title: "Custom Plan",
      description: "Fully customized to your needs",
      price: "Available to Quote",
      features: [
        "Custom Pages & Features",
        "Advanced Integrations",
        " Responsive Layout",
        "API design",
      ],
      buttonText: "know more",
      buttonRedirectionUrl: "/moreinfo/3",
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
      <Background dots={true} />

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
        >
          <Flex mobileDirection="column" gap="16">
            <Flex
              position="relative"
              flex={2}
              paddingTop="56"
              paddingX="xl"
              alignItems="flex-end"
              justifyContent="flex-start"
              marginBottom="20"
            >
              <Logo size="xl" icon={false} style={{ zIndex: "1" }} />
              <span className="font-code">
                <LetterFx trigger="instant">ColorMetta</LetterFx>
              </span>
            </Flex>
            <Flex
              position="relative"
              flex={4}
              gap="16"
              // marginBottom="12"
              direction="column"
            >
              <Heading wrap="balance" variant="display-strong-s">
                <span className="font-code">
                  <SmartImage
                    src="/ProcessDiagram.drawio.png"
                    height={18}
                    alt="image"
                    sizes="m"
                    priority={false}
                    objectFit="scale-down"
                    radius="8"
                    enlarge={true}
                    aspectRatio="2"
                  />
                </span>
              </Heading>
            </Flex>
          </Flex>
          <Flex alignItems="strech" justifyContent="center" margin="8">
            <Button href="/contact" variant="secondary">
              Build My Website
            </Button>
          </Flex>
          <Flex justifyContent="center" margin="4" alignItems="center">
            <Text>
              {" "}
              All plans are one-time payments and includes hosting for a year,
              optimized Image managment and don´t includes the domain{" "}
            </Text>
          </Flex>

          {/* Pricing Cards */}
          <RevealFx speed="medium" delay={0} translateY={3}>
            <Grid
              radius="l"
              // border="neutral-medium"
              // borderStyle="solid-1"
              columns="repeat(3, 1fr)"
              tabletColumns="1col"
              mobileColumns="1col"
              maxWidth={"m"}
              padding="4"
              margin="20"
              gap="12"
            >
              {plans.map((plan, index) => (
                <Flex
                  key={index}
                  fillWidth
                  paddingY="12"
                  gap="4"
                  direction="column"
                  radius="l"
                  border="neutral-medium"
                  borderStyle="solid-2"
                  padding="m"
                  alignItems="center"
                >
                  <Flex
                    fillWidth
                    gap="8"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      variant="body-strong-xl"
                      onBackground="neutral-strong"
                    >
                      {plan.title}
                    </Text>
                  </Flex>
                  <Flex justifyContent="center" margin="8" marginRight="8">
                    <Text variant="body-strong-m" onBackground="neutral-strong">
                      {plan.price} {index != 2 && "(One-time payment)"}
                    </Text>
                  </Flex>
                  <Flex
                    alignItems="flex-end"
                    justifyContent="center"
                    padding="12"
                    paddingBottom="20"
                  >
                    <Button href={plan.buttonRedirectionUrl} variant="primary">
                      {plan.buttonText}
                    </Button>
                  </Flex>
                  <Flex
                    direction="column"
                    background="brand-weak"
                    radius="m"
                    padding="20"
                  >
                    <Text
                      variant="body-default-m"
                      onBackground="neutral-medium"
                      marginBottom="8"
                    >
                      {plan.description}
                    </Text>
                    <Flex margin="4" gap="4">
                      <ul>
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>
                            <Text
                              variant="body-default-s"
                              onBackground="neutral-weak"
                            >
                              {feature}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          </RevealFx>
        </Flex>
      </Flex>

      {/* Footer */}
      {/* <Flex
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
      </Flex> */}
    </Flex>
  );
};

export default Pricing;
