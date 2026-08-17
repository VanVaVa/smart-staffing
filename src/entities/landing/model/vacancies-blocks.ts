import { vacanciesPage } from "./vacancies-content";
import { cloneProps, isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const VACANCIES_BLOCK_TYPES = ["vacancies"] as const;

export type VacanciesBlockType = (typeof VACANCIES_BLOCK_TYPES)[number];

export type VacanciesBlockProps = typeof vacanciesPage;

export type VacanciesBlock = LandingBlockBase<"vacancies", VacanciesBlockProps>;

export type VacanciesPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: VacanciesBlock[];
};

;

function parseVacanciesProps(value: unknown): VacanciesBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.vacancies)) {
    return null;
  }
  return cloneProps(value as VacanciesBlockProps);
}

export function parseVacanciesBlockProps(
  type: VacanciesBlockType,
  props: unknown,
): VacanciesBlockProps | null {
  if (type !== "vacancies") {
    return null;
  }
  return parseVacanciesProps(props);
}

export function parseVacanciesBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): VacanciesBlock | null {
  if (!isVacanciesBlockType(input.type)) {
    return null;
  }
  const props = parseVacanciesBlockProps(input.type, input.props);
  if (!props) {
    return null;
  }
  return {
    id: input.id,
    order: input.order,
    type: input.type,
    props,
  };
}

export function isVacanciesBlockType(value: string): value is VacanciesBlockType {
  return VACANCIES_BLOCK_TYPES.includes(value as VacanciesBlockType);
}

export function vacanciesBlocksFromStaticContent(): Array<{
  order: number;
  type: VacanciesBlockType;
  props: VacanciesBlockProps;
}> {
  return [{ order: 0, type: "vacancies", props: cloneProps(vacanciesPage) }];
}
