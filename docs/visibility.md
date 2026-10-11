# Col visibility and launch plan

Research date: 2026-10-02. Linked research sources were opened on this date. Scope: production HTTP and repository audit, local discovery fixes, organic marketing and publicity drafts. No deployment, provider submissions, publishing, outreach, spend, or browser testing.

## Site and outcome

- Site: https://collection-of-libs.vercel.app, confirmed accessible and configured in `lib/site.ts`. No alternate owned domain supplied.
- Offering: Col, an open-source, community-maintained directory of 56 UI libraries with stack/category/use-case filtering, recorded component search, local saves, official documentation links, setup guidance and coding-agent prompts.
- Audience: frontend developers and product designers choosing libraries for active projects, plus contributors. English and global, inferred from PRODUCT.md and the catalog; no regional demand evidence.
- Primary conversion: finding a suitable library and opening its official website or component documentation. Secondary: a useful catalog contribution. Sponsorship is a separate supporting goal.
- Recommended positioning: “Find a UI library for your stack, then check its documented components.” Coverage is partial. No measured time savings, adoption figures, exhaustive coverage or accessibility guarantees are claimed.

## Findings and actions

| Finding | Evidence and status | Next action |
| --- | --- | --- |
| Public content is fetchable | **Production HTTP verified:** all 61 deployed sitemap URLs returned 200. Four omitted docs routes, trailing-slash contributors URL and two image assets also returned 200: 68 requests total. Meaningful directory and detail text appears in HTML. | Provider inspection is still needed to establish actual indexing and verified crawler access. |
| Missing canonicals and generic metadata | **Implemented locally:** only the 56 library pages had canonicals in the production inventory. Added accurate titles, descriptions, canonicals, Open Graph and Twitter identity across all 66 intended public pages through `pageMetadata`. Existing image and account retained. | Deploy, then check production metadata and previews. |
| Filter URL duplication | **Implemented locally:** directory query URLs canonicalize to `/libraries`, matching the general directory content rendered before interactive filtering. | Inspect provider-selected canonical; keep filter URLs out of sitemap. |
| Sitemap omissions | **Implemented locally:** added four missing docs routes, preserving the existing local agents guide. Local sitemap now contains 10 static routes and 56 library details, 66 URLs. | Submit the real deployed sitemap after release. |
| Build-time modification dates | **Implemented locally:** omitted inaccurate build-time `lastmod`; there are no maintained content timestamps. [Google requires accurate significant-change dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). | Add dates only when actual content modification dates exist. |
| Placeholder page | **Implemented locally:** `/Alexandria` returns 200 with “Something is happening.” Added `noindex, follow`, kept it fetchable and outside sitemap. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing). | Keep excluded until useful content exists. |
| Site identity | **Implemented locally:** one homepage `WebSite` JSON-LD object with Col name, root URL, description and stable ID; safe serialization. No invented company/reviews/offers. [Google site-name guidance](https://developers.google.com/search/docs/appearance/site-names). | Validate deployed markup with Schema Markup Validator; site-name data is not a Rich Results Test feature. |
| Agents guide release gap | **Not deployed:** `/docs/agents` returned 404 in production. Its local implementation and richer `llms.txt` were already uncommitted before this run. Preserved them and added metadata. | Include the existing guide in an authorized release before promoting it. |
| Robots and AI discovery | **No change needed:** wildcard allow admits search crawlers. Existing explicit allow groups and training preferences preserved. Search crawler OAI-SearchBot is separate from GPTBot per [OpenAI documentation](https://developers.openai.com/api/docs/bots). Existing `llms.txt` retained for its agent use. [Google's AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) emphasizes useful original content and standard SEO. | If discovery fails, inspect provider reports and authenticated crawl logs. Neither crawler access nor an agent catalog guarantees citations. |
| Redirects and missing URLs | **Production HTTP verified:** HTTP root and trailing-slash directory return 308 to intended HTTPS/slashless URLs. A missing URL returns genuine 404. | No changes needed. |
| Media | **Production HTTP verified:** logo PNG and social JPEG return 200; deployed JPEG declares 100,054 bytes. A local replacement already existed. Sharing metadata declares 1200×630. | Verify replacement preview after release. No images modified by this run. |
| Search ownership | **Blocked:** no verification tags or account integrations found in inspected code. Other verification methods may already exist. No owner account/token supplied. | Follow exact handoff below. |
| Analytics and performance | **Unmeasured:** no application analytics integration found. Hosting analytics may exist but were unavailable. No traffic, conversions, rankings or field Web Vitals baseline. | Reuse existing hosting analytics before selecting a tracker. No performance edits or speed claims. |

Implementation follows the installed Next.js 16.3.5 metadata, sitemap and JSON-LD guides. No dependency added. Existing branding, navigation, robots preferences, agent work, social assets and unrelated working changes preserved.

## Ownership and release handoff

1. Review and authorize deployment of these changes alongside the pre-existing agents/social work. Recheck `/docs/agents`, public canonicals, all 66 sitemap URLs and placeholder noindex on production.
2. In [Google Search Console](https://search.google.com/search-console), select the existing exact property or add URL-prefix `https://collection-of-libs.vercel.app/`. Do not attempt DNS verification of the parent `vercel.app` domain. [Verification methods](https://support.google.com/webmasters/answer/9008080).
3. If already verified, retain that method. Otherwise supply the actual public HTML-tag content token for Next.js `metadata.verification.google`, or use the provider's exact file method. No placeholder token added. Deploy it, verify its public response, then click Verify in the owner account.
4. Submit `https://collection-of-libs.vercel.app/sitemap.xml`. Inspect `/`, `/libraries`, `/libraries/shadcn-ui`, `/docs/agents`. Record ownership verified, sitemap accepted, crawl and indexing separately.
5. In [Bing Webmaster Tools](https://www.bing.com/webmasters/), import the verified Google property or use the owner's supported method, then submit the same sitemap. [Bing setup guidance](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/).
6. Keep verification tokens in place. A future owned-domain move must align `siteUrl`, redirects, provider properties and campaign links. IndexNow is deferred because frequent publication is not established.

## Search and content strategy

Observed adjacent products include [ComponentLibraries](https://componentlibraries.com/) and [finduikit](https://github.com/izorg/finduikit), which already describe framework filtering and library comparison. These are positioning observations, not traffic estimates. Recommendation: emphasize recorded component queries leading to exact official docs and practical setup guidance. Do not claim this is unique.

| Intent | Existing destination | Evidence to maintain |
| --- | --- | --- |
| UI libraries for a stack | `/libraries` | Actual stack, category and use-case data; useful filters. |
| Named library evaluation/setup | `/libraries/{slug}` | Current official installation/pricing sources, fit and related alternatives. |
| Documented component discovery | `/docs/find-a-library`, then directory | A real component query and exact documentation link; partial-coverage caveat. |
| Library discovery with an agent | `/docs/agents`, after deployment | Existing prompt, source verification and limitations. MCP remains proposed, not shipped. |
| Add a library | `/docs/request-a-library`, `/docs/pull-requests` | Focused contribution steps and official source requirements. |

First original content experiment: a short walkthrough, “How to shortlist a date-picker library for your stack.” Show a real query, verify three returned entries against official docs, and explain one concrete tradeoff per option. Prepare after checking the actual release. Expand content only if query impressions or user questions establish demand. No new blog infrastructure or thin keyword pages needed.

## Organic experiments and measurement

All campaigns below are **drafts**, with zero authorized spend. Effort estimates are recommendations. Review dates assume launch by October 9; shift with the real date.

| Priority | Channel and audience | Asset, destination and account | Goal / effort / review |
| --- | --- | --- | --- |
| 1 | Maker X account, frontend followers | Copy below, existing preview; `/libraries`; `@Screeendev` from metadata, account ownership to confirm | Useful source visits and feedback / 30 minutes / October 16 |
| 1 | [Show HN](https://news.ycombinator.com/showhn.html), developer makers | Tryable directory and source; `/libraries`; owner's intended HN account needed | Relevant feedback and visits / 1 hour plus replies / October 16 |
| 2 | [Frontend Focus](https://frontendfoc.us/), frontend engineers | Editorial pitch below; `/libraries`; owner-authorized email | Relevant resource mention and usage / 30 minutes / October 23 |
| 2 | [React Status](https://react.statuscode.com/), React developers | Tailored alternative pitch; `/libraries?q=React`; same publisher as above | Relevant React visits / 30 minutes / October 23 |
| 3 | [Product Hunt](https://www.producthunt.com/), web product makers | Listing below and existing preview; `/libraries`; owner's maker account needed | Actual use and feedback / 2 hours plus replies / October 23 |

Baseline unknown. Record seven days of available hosting traffic/referrers and provider impressions before launch. Measure outbound official-source clicks if an existing tool supports them; otherwise label visits as a proxy and collect specific feedback. Proposed events, not implemented: `official_source_open` with slug/destination type, and `library_request_open`. Do not collect search text, personal data or local saved lists by default.

Where supported, use `utm_source=x`, `utm_medium=social`, `utm_campaign=col_launch_2026_10`; newsletters use `frontend_focus` or `react_status` and medium `email`. Keep internal links clean; respect publishers' own URLs. [Campaign URL guidance](https://support.google.com/analytics/answer/10917952). Continue channels that produce useful source visits, actionable feedback or contributions within available effort, rather than judging stars/upvotes alone. Provider submissions do not prove indexing; traffic changes do not establish causation.

## Ready-to-review launch drafts

### X

Intended account: `@Screeendev`, confirm owner/account before publishing. Asset: existing `public/col-social-preview.jpg`.

> I built Col to help find UI libraries by stack, use case, or component name. Component matches link to official docs. Coverage is partial, and the directory is open source. Try it: https://collection-of-libs.vercel.app/libraries

### Show HN

Destination: https://news.ycombinator.com/submit with the owner's intended account. Link: https://collection-of-libs.vercel.app/libraries. Title:

> Show HN: Col, an open-source UI library directory with component-doc search

Maker comment:

> I made Col for choosing UI libraries while working on a project. Search by framework, category, use case, or a recorded component name, then follow official documentation. Library pages include setup guidance and a prompt you can adapt for a coding agent.
>
> The component index is verified but partial. A missing result does not mean a library lacks that component. Saved libraries stay in your browser. Source and contribution guide: https://git.cafe/screen/col.
>
> I'd like feedback on which filters and component searches help you choose a library, and where the directory sends you to an unhelpful source.

Follow [Show HN guidelines](https://news.ycombinator.com/showhn.html): usable project, explicit maker relationship, no vote solicitation. The directory can be tried without a signup gate.

### Product Hunt, optional after initial experiments

Account/date: owner to select. Name: Col. Tagline:

> Find UI libraries by stack, use case, and documented components

Description:

> Col is an open-source UI library directory. Filter by stack, category, and use case; search recorded component names; and follow official documentation. Save a shortlist locally and use library-specific setup prompts. Component coverage is partial and grows through reviewed contributions.

Maker comment:

> I built Col to keep library research in one place while preserving links to original projects. Try a component query, open its official docs, and tell me where discovery breaks down. Contributions and source corrections are welcome on git.cafe.

Use the existing approved mark and preview. Optional 20-second demo: query → matching library → official component docs, with a partial-coverage caption. No invented endorsements. [Sharing rules](https://help.producthunt.com/en/articles/2690626-how-do-i-share-my-post) prohibit mass vote requests, incentives and coordinated voting.

## Publicity targets and pitches

### Frontend Focus, first choice

Verified public editorial inbox: `editor@cooperpress.com`, listed on [Cooperpress's contact page](https://cooperpress.com/). [September 30 issue 760](https://frontendfoc.us/issues/760) includes UI resources Transitions.dev and soundcn, supporting audience fit; it identifies Chris Brandrick and Peter Cooper as curators and invites replies with links. Replying to a subscribed issue is another published route. Pitch for the resources section, not a major funding/news story.

Subject: Col: UI library discovery with direct component-documentation links

> Hi Frontend Focus team,
>
> I built Col, an open-source directory for choosing UI libraries by stack, category, and use case. Searching a recorded component name leads directly to the library's official component docs; coverage is partial and reviewed through contributions.
>
> Your September 30 tools section included Transitions.dev and soundcn. Col may be useful to readers deciding which library fits a project before they install it.
>
> Directory: https://collection-of-libs.vercel.app/libraries
> Source and contribution guide: https://git.cafe/screen/col
>
> I'm happy to walk through a component query or explain how source verification works.
>
> Screen

### React Status, tailored alternative

Same editorial inbox: do not send two simultaneous near-identical pitches. [September 25 issue 492](https://react.statuscode.com/issues/492) identifies Peter Cooper as editor and includes React UI tools pdfcn and Frimousse. It states the next issue is October 9; recheck timing and role before sending.

Subject: Col: shortlist React UI libraries and check their component docs

> Hi React Status team,
>
> I built Col, an open-source UI library directory. React developers can narrow the catalog by stack and use case, search recorded component names, and open official documentation. Detail pages provide source-linked setup guidance and adaptable coding-agent prompts.
>
> Your recent tools section covered pdfcn and Frimousse. Col offers readers a way to shortlist libraries for their own projects. Component coverage is explicitly partial rather than an exhaustive compatibility matrix.
>
> React directory: https://collection-of-libs.vercel.app/libraries?q=React
> Source: https://git.cafe/screen/col
>
> Happy to share a walkthrough or answer questions about the catalog.
>
> Screen

Available factual press assets: product description above, repo, existing mark, existing social preview, maker name Screen as supplied in project instructions. Longer founder bio and demo capture are not supplied. No customer results, adoption figures, awards or endorsements. All outreach remains draft pending authorization for recipient and final text.

Partnership hypothesis, deferred: after a maintainer confirms its listing, ask through that project's published contact whether a discovery walkthrough belongs in its community resources. No relationship, recipient or permission is established; no scraped contact list or backlink exchange.

## Next actions and boundaries

1. Authorize release after reviewing the concrete visibility diff and existing local work.
2. Complete Google/Bing owner handoff; record acceptance and actual indexing separately.
3. Choose owner accounts/date and approve selected X/Show HN drafts; reserve time for replies.
4. Approve the Frontend Focus pitch. Use React Status as an alternative, not duplicate outreach.
5. Review October 16/23 results, recording unknown measurement rather than inventing outcomes.

Local business profiles are not applicable to this online directory. Paid listings, ads, purchased links, mass outreach, regional keyword pages, a new analytics service and a dedicated marketing backend are outside this organic run.

## Verification

### Social preview cache follow-up, 2026-10-02

Production HTTP requests using Twitterbot and Discordbot user agents returned the same current card metadata. The current production JPEG matched the local image byte-for-byte (SHA-256). The supplied X screenshot showed an older title and artwork, consistent with a stale X card; X's internal cache was not directly inspected.

Changed the shared image URL to `/col-social-preview-v5.jpg` and preserved the previous file. Updated the generator to produce the versioned file. Both old and versioned preview JPEG paths receive `Cache-Control: public, max-age=60, s-maxage=60`. This controls HTTP cache freshness, not X's independent card cache. On artwork changes, use another new filename and update the shared URL and generator together.

Typecheck, production build, discovery tests and local HTTP checks passed. Twitterbot metadata points to the new filename; both JPEG responses returned 200 with the 60-second cache header. After release, share `https://collection-of-libs.vercel.app/?share=col-v5` to give X a fresh page URL to fetch. Canonical URLs remain clean. X preview refresh is not guaranteed or browser-verified.

Production audit: 68 successful inventory requests as described above; additional probes established `/docs/agents` and a nonexistent route return 404, `/Alexandria` is currently indexable, query URL lacks canonical, and HTTP/trailing-slash redirects are 308. This did not audit every external library link or revalidate installation claims for all 56 libraries.

Local: `npm run typecheck`, `npm run build` and `node --test` passed, 42/42 tests. Generated HTML checks cover public static metadata, schema syntax, sitemap coverage and placeholder noindex. Local HTTP checks confirmed `/libraries` and `/libraries?q=React` return 200 with canonical and Open Graph URL `/libraries`, `/docs/agents` returns 200, and `/Alexandria` serves noindex. An HTTP crawl checked all 66 local sitemap pages and 73 distinct internal link targets, with no broken destinations or missing same-page anchors. `git diff --check` passed. No provider verification, indexing, rankings, field performance or published campaign result claimed.
