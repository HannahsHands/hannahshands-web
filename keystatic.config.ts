import { config, fields, collection, singleton } from '@keystatic/core';

// Content model for Hannah's Hands. Storage is `local` (edit on your machine)
// and switches to `github` (edit the live site) at deploy time (T10).
export default config({
  // Local editing while developing; Keystatic Cloud auth on the live site.
  // Cloud handles GitHub login with no env vars / custom GitHub app needed.
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: 'hannahs-hands/hannahshands-web' },
  ui: {
    brand: { name: "Hannah's Hands" },
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'yaml' },
      schema: {
        tagline: fields.text({ label: 'Tagline', defaultValue: 'where service meets luxury' }),
        email: fields.text({ label: 'Email' }),
        instagram: fields.text({ label: 'Instagram handle' }),
        facebook: fields.text({ label: 'Facebook handle' }),
        phone: fields.text({ label: 'Phone (optional)' }),
        calendlyUrl: fields.url({ label: 'Calendly booking URL' }),
        stats: fields.array(
          fields.object({
            number: fields.text({ label: 'Number' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Hero stats', itemLabel: (p) => `${p.fields.number.value} — ${p.fields.label.value}` }
        ),
      },
    }),
  },
  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { data: 'yaml' },
      columns: ['title', 'category', 'year'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Conferences & Summits', value: 'conferences' },
            { label: 'Galas & Awards', value: 'galas' },
            { label: 'Corporate & Networking', value: 'corporate' },
            { label: 'Leadership & Faith', value: 'leadership' },
            { label: 'Charity & Concerts', value: 'charity' },
          ],
          defaultValue: 'conferences',
        }),
        year: fields.text({ label: 'Year / timeframe' }),
        location: fields.text({ label: 'Location' }),
        client: fields.text({ label: 'Client (optional)' }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/events',
          publicPath: '/images/events/',
        }),
        summary: fields.text({ label: 'Short summary', multiline: true }),
        story: fields.text({ label: 'Case study (optional)', multiline: true }),
        featured: fields.checkbox({ label: 'Feature on homepage', defaultValue: false }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      format: { data: 'yaml' },
      columns: ['author', 'context'],
      schema: {
        author: fields.slug({ name: { label: 'Author' } }),
        context: fields.text({ label: 'Event / role' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        featured: fields.checkbox({ label: 'Feature on homepage', defaultValue: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'yaml' },
      columns: ['title', 'number'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        number: fields.text({ label: 'Number (e.g. 01)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 0 }),
      },
    }),
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { data: 'yaml' },
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publish date', defaultValue: { kind: 'today' } }),
        excerpt: fields.text({ label: 'Short excerpt (shown on the blog list)', multiline: true }),
        coverImage: fields.image({
          label: 'Cover image (blog list thumbnail)',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/blog',
            publicPath: '/images/blog/',
          }),
          { label: 'Images (shown top-to-bottom, full size)', itemLabel: (props) => props.value ?? 'Image' }
        ),
        body: fields.text({ label: 'Text (optional — appears under the images)', multiline: true }),
        draft: fields.checkbox({ label: 'Draft (hidden from the site)', defaultValue: false }),
      },
    }),
  },
});
