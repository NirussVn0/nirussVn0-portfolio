export interface TagProps {
  readonly label: string;
  readonly slug?: string;
}

export class Tag {
  private readonly label: string;
  private readonly slug: string;

  constructor(props: TagProps) {
    const normalizedLabel = props.label.trim();

    if (!normalizedLabel) {
      throw new Error('Tag label must be a non-empty string.');
    }

    this.label = normalizedLabel;
    this.slug = props.slug ? Tag.normalize(props.slug) : Tag.slugify(normalizedLabel);
  }

  static normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  static slugify(value: string): string {
    return Tag.normalize(value).replace(/[^a-z0-9]+/g, '-');
  }

  getLabel(): string {
    return this.label;
  }

  getSlug(): string {
    return this.slug;
  }

  equals(value: string): boolean {
    return this.slug === Tag.normalize(value);
  }
}
