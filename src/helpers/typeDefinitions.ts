export interface Project {
  order?: number;
  id: string;
  name: string;
  image: string;
  description?: string;
  logo?: string;
  accent?: string;
  tags?: string[];
}
