import type { AdminValues } from "@/shared/ui/admin-form";
import {
  clientsPageFromFormValues,
  groupValues,
  normalizePlatformBenefitsLists,
  patchClientsNestedGroup,
  patchClientsPageGroup,
  type PlatformBenefitsCardLayout,
} from "@/entities/landing/model/clients-admin-form";
import type {
  ClientsHeroContent,
  ClientsPartnersExperienceContent,
  ClientsPartnershipCtaContent,
  ClientsPlatformBenefitsContent,
  ClientsPlatformContent,
} from "@/entities/landing/model/clients-content";

export function getHeroContent(values: AdminValues): ClientsHeroContent {
  return clientsPageFromFormValues(values).blocks.hero as ClientsHeroContent;
}

export function getPlatformContent(values: AdminValues): ClientsPlatformContent {
  return clientsPageFromFormValues(values).blocks.platform as ClientsPlatformContent;
}

export function getPlatformBenefitsContent(
  values: AdminValues,
): ClientsPlatformBenefitsContent {
  return clientsPageFromFormValues(values).blocks
    .platformBenefits as ClientsPlatformBenefitsContent;
}

export function getPartnersExperienceContent(
  values: AdminValues,
): ClientsPartnersExperienceContent {
  return clientsPageFromFormValues(values).blocks
    .partnersExperience as ClientsPartnersExperienceContent;
}

export function getPartnershipCtaContent(values: AdminValues): ClientsPartnershipCtaContent {
  return clientsPageFromFormValues(values).blocks.partnershipCta as ClientsPartnershipCtaContent;
}

export function patchHero(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "hero", patch);
}

export function patchHeroSubtitle(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsNestedGroup(values, "hero", "subtitle", patch);
}

export function patchPlatform(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "platform", patch);
}

export function patchPlatformBenefits(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "platformBenefits", patch);
}

export function patchPlatformBenefitsCardLayout(
  values: AdminValues,
  segment: string,
  cardLayout: PlatformBenefitsCardLayout,
): AdminValues {
  return patchClientsPageGroup(
    values,
    "platformBenefits",
    normalizePlatformBenefitsLists(segment, {
      ...groupValues(values, "platformBenefits"),
      cardLayout,
    }),
  );
}

function listValues(values: AdminValues, key: string): AdminValues[] {
  return Array.isArray(values[key]) ? (values[key] as AdminValues[]) : [];
}

function patchPlatformBenefitsImageList(
  values: AdminValues,
  listKey: "cards" | "showcase",
  index: number,
  imageSrc: string,
): AdminValues {
  const segment = typeof values.segment === "string" ? values.segment : "";
  const platformBenefits = normalizePlatformBenefitsLists(
    segment,
    groupValues(values, "platformBenefits"),
  );
  const items = listValues(platformBenefits, listKey);

  return patchPlatformBenefits(values, {
    ...platformBenefits,
    [listKey]: items.map((item, itemIndex) => {
      if (itemIndex !== index) {
        return item;
      }

      const nextItem: AdminValues = { ...item, imageSrc };
      delete nextItem.responsiveImages;
      return nextItem;
    }),
  });
}

export function patchPlatformBenefitsCardImage(
  values: AdminValues,
  index: number,
  imageSrc: string,
): AdminValues {
  return patchPlatformBenefitsImageList(values, "cards", index, imageSrc);
}

export function patchPlatformBenefitsShowcaseImage(
  values: AdminValues,
  index: number,
  imageSrc: string,
): AdminValues {
  return patchPlatformBenefitsImageList(values, "showcase", index, imageSrc);
}

export function patchPartnersExperience(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "partnersExperience", patch);
}

export function patchCaseStudy(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsNestedGroup(values, "partnersExperience", "caseStudy", patch);
}

export function patchPartnershipCta(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "partnershipCta", patch);
}

export function patchPageMeta(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "meta", patch);
}

export function getStringList(values: AdminValues, groupKey: string, listKey: string): string[] {
  const group = groupValues(values, groupKey);
  const list = group[listKey];
  return Array.isArray(list)
    ? list.filter((item): item is string => typeof item === "string")
    : [];
}
