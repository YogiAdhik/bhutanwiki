import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const articles = [
  {
    slug: 'bhutanese-refugee-crisis',
    title: 'The Bhutanese Refugee Crisis',
    category: 'history',
    summary:
      'The Bhutanese refugee crisis is one of the largest per-capita forced displacement events in modern history. Between the late 1980s and early 1990s, over 100,000 Lhotshampa — ethnic Nepali-speaking Bhutanese from southern Bhutan — were expelled or fled due to systematic ethnic cleansing by the Bhutanese state.',
    content_md: `<h2>Overview</h2>
<p>The Bhutanese refugee crisis refers to the forced displacement of over 100,000 Lhotshampa (ethnic Nepali-speaking Bhutanese) from Bhutan during the late 1980s and 1990s. It remains one of the largest per-capita refugee crises in modern history, yet it is remarkably absent from global consciousness.</p>
<p>The crisis was the result of deliberate state policies aimed at cultural homogenization and ethnic exclusion, including the enforcement of <em>Driglam Namzha</em> (a code of traditional Ngalop etiquette and dress), the 1985 Citizenship Act that retroactively stripped citizenship from tens of thousands of southern Bhutanese, and the violent suppression of protests in 1990.</p>

<h2>Background</h2>
<p>The Lhotshampa had lived in southern Bhutan for generations, many tracing their roots to the 19th century when Nepali-speaking settlers were actively encouraged to migrate to Bhutan's underpopulated southern foothills. By the 1980s, they constituted an estimated one-third of Bhutan's population.</p>
<p>The Bhutanese monarchy, dominated by the Ngalop ethnic group of western Bhutan, grew increasingly concerned about the demographic and cultural influence of the Lhotshampa. This anxiety drove a series of policies designed to marginalize and ultimately remove the southern Bhutanese population.</p>

<h2>Key Events</h2>
<h3>1985 Citizenship Act</h3>
<p>The 1985 Bhutan Citizenship Act imposed stringent requirements for citizenship, demanding proof of residence in Bhutan prior to December 31, 1958. Many Lhotshampa who had lived in Bhutan for decades — and whose families had been there for generations — were reclassified as "illegal immigrants" overnight because they could not produce documentation from nearly 30 years earlier.</p>

<h3>1988 Census</h3>
<p>A national census conducted in 1988 categorized the population into seven groups, effectively determining who was "genuinely Bhutanese." Southern Bhutanese who could not prove their 1958 residency were classified as non-nationals and faced immediate consequences: loss of access to education, healthcare, and employment.</p>

<h3>Driglam Namzha Enforcement (1989)</h3>
<p>In 1989, the government mandated <em>Driglam Namzha</em> — the traditional code of conduct and dress of the Ngalop — across the entire country. Lhotshampa were required to wear the <em>gho</em> and <em>kira</em> (traditional Ngalop garments), abandoning their own cultural dress (<em>daura suruwal</em> and <em>sari</em>). The Nepali language was removed from the school curriculum and replaced with Dzongkha. Hindu temples and cultural practices faced increasing restrictions.</p>

<h3>1990 Protests</h3>
<p>In September and October 1990, thousands of southern Bhutanese took to the streets in peaceful protests demanding civil rights, cultural recognition, and the restoration of citizenship. The government responded with mass arrests, torture, and forced expulsions. Homes were burned, property confiscated, and families given hours to leave the country.</p>

<h3>Mass Expulsion (1990–1993)</h3>
<p>Over the following years, more than 100,000 Lhotshampa were expelled or forced to flee to Nepal. Many were coerced into signing "voluntary migration forms" under duress — a tactic the government later used to claim they had left willingly. Those who remained faced ongoing persecution, surveillance, and pressure to leave.</p>

<h2>Refugee Camps in Nepal</h2>
<p>The refugees were housed in seven UNHCR-administered camps in southeastern Nepal, primarily in the Jhapa and Morang districts. At their peak, the camps held over 108,000 people. Conditions were difficult but organized, with the refugee community establishing schools, community organizations, and cultural institutions within the camps.</p>
<p>For nearly two decades, the refugees lived in limbo. Bilateral negotiations between Bhutan and Nepal failed repeatedly, with Bhutan showing no genuine willingness to repatriate its displaced citizens.</p>

<h2>Third Country Resettlement</h2>
<p>Beginning in 2007, the United States, along with seven other countries (Canada, Australia, New Zealand, Norway, Denmark, the Netherlands, and the United Kingdom), launched a third-country resettlement program. By 2023, over 113,000 Bhutanese refugees had been resettled, with approximately 96,000 going to the United States alone.</p>
<p>Major resettlement cities in the US include Columbus (Ohio), Pittsburgh (Pennsylvania), Atlanta (Georgia), and Akron (Ohio), among many others. The resettled community has built vibrant cultural organizations, businesses, and advocacy networks.</p>

<h2>Legacy and Ongoing Impact</h2>
<p>The Bhutanese refugee crisis has had profound and lasting consequences:</p>
<ul>
<li>Over 100,000 people permanently displaced from their homeland</li>
<li>Families separated across multiple countries and continents</li>
<li>Loss of ancestral lands, property, and cultural heritage</li>
<li>Intergenerational trauma affecting refugee families</li>
<li>Elevated rates of mental health challenges, including depression and suicide, in resettled communities</li>
<li>The near-complete erasure of the Lhotshampa presence from southern Bhutan</li>
</ul>
<p>Despite these challenges, the Bhutanese diaspora has shown remarkable resilience, building new lives while maintaining cultural identity and advocating for justice and recognition.</p>

<h2>International Response</h2>
<p>The international community's response has been widely criticized as inadequate. Bhutan's carefully cultivated image as a peaceful "Land of Happiness" has shielded it from the scrutiny that similar crises have attracted elsewhere. The government has never acknowledged wrongdoing or accepted responsibility for the expulsions.</p>`,
    status: 'published',
  },
  {
    slug: '1985-bhutanese-citizenship-act',
    title: '1985 Bhutanese Citizenship Act',
    category: 'politics',
    summary:
      'The Bhutan Citizenship Act of 1985 retroactively tightened citizenship requirements, demanding proof of residency prior to December 31, 1958. This law effectively stripped citizenship from tens of thousands of Lhotshampa and became a central instrument of the ethnic cleansing that followed.',
    content_md: `<h2>Overview</h2>
<p>The Bhutan Citizenship Act of 1985 replaced the earlier 1958 Nationality Law and imposed dramatically stricter criteria for Bhutanese citizenship. The Act required individuals to prove that they or their ancestors had been residents of Bhutan on or before December 31, 1958 — a nearly impossible standard for many Lhotshampa families who had lived in Bhutan for generations but lacked formal documentation from that era.</p>

<h2>Key Provisions</h2>
<p>The Act established two paths to citizenship:</p>
<ul>
<li><strong>Citizenship by birth:</strong> A person whose father was a citizen of Bhutan at the time of their birth. This patrilineal requirement excluded children of Bhutanese mothers married to non-citizens.</li>
<li><strong>Citizenship by registration:</strong> Required proof of residency in Bhutan before December 31, 1958, along with evidence of having been registered in the official records during that period.</li>
</ul>
<p>The Act also introduced provisions for the revocation of citizenship, including for individuals who had "acquired citizenship by fraud, false representation or the concealment of any material fact."</p>

<h2>Impact on the Lhotshampa</h2>
<p>The 1985 Act had devastating consequences for the Lhotshampa community:</p>
<ul>
<li>Tens of thousands of southern Bhutanese who had been recognized as citizens under the 1958 law were reclassified as "non-nationals" or "illegal immigrants"</li>
<li>The burden of proof was placed on individuals, who were required to produce documents from nearly three decades earlier — documents that many rural families never possessed</li>
<li>Government officials conducted arbitrary assessments, and families were frequently categorized differently even when their circumstances were identical</li>
<li>Loss of citizenship meant loss of access to education, healthcare, employment, and the right to own land</li>
</ul>

<h2>Connection to the 1988 Census</h2>
<p>The 1985 Act provided the legal framework for the 1988 national census, which categorized the population into groups based on their ability to meet the Act's requirements. Those who could not prove 1958 residency were classified as "non-nationals" and became targets for expulsion.</p>

<h2>International Criticism</h2>
<p>Human rights organizations, including Amnesty International and Human Rights Watch, have criticized the 1985 Act as a tool of ethnic discrimination deliberately designed to strip citizenship from the Lhotshampa. The retroactive nature of the law — changing the rules decades after the fact — has been described as a violation of international norms against statelessness.</p>

<h2>Current Status</h2>
<p>The 1985 Citizenship Act remains in force. The 2008 Constitution of Bhutan incorporated similar citizenship provisions, and the government has shown no indication of reforming these laws to allow displaced Lhotshampa to reclaim citizenship.</p>`,
    status: 'published',
  },
  {
    slug: 'lhotshampa',
    title: 'Lhotshampa',
    category: 'culture',
    summary:
      'The Lhotshampa ("southerners") are an ethnic Nepali-speaking people of southern Bhutan. Once comprising roughly one-third of Bhutan\'s population, the majority were expelled during the ethnic cleansing of the late 1980s and 1990s and now form a global diaspora.',
    content_md: `<h2>Overview</h2>
<p>The Lhotshampa (Dzongkha: ལྷོ་མཚམས་པ, literally "southerners") are the ethnic Nepali-speaking people of Bhutan, historically concentrated in the southern foothills and plains of the country. The term encompasses diverse communities united by Nepali language, Hindu religious practices (with some Buddhist practitioners), and cultural traditions distinct from the dominant Ngalop culture of western and central Bhutan.</p>

<h2>History</h2>
<p>Nepali-speaking settlers began migrating to southern Bhutan in significant numbers during the late 19th and early 20th centuries, often at the encouragement of the Bhutanese government, which sought to develop the sparsely populated southern regions. By the mid-20th century, the Lhotshampa had established thriving agricultural communities and constituted an estimated 30-40% of Bhutan's total population.</p>
<p>The Lhotshampa contributed significantly to Bhutan's economy, particularly through agricultural development of the southern lowlands. They cleared forests, built terraced farmland, and produced much of the country's food supply. They also contributed to the construction of Bhutan's early road infrastructure.</p>

<h2>Culture and Identity</h2>
<h3>Language</h3>
<p>The Lhotshampa speak Nepali (also known as Lhotshamkha in Bhutan) as their primary language, along with various regional dialects. Until 1989, Nepali was taught in schools in southern Bhutan. The removal of Nepali from the curriculum was one of the cultural suppression measures that preceded the refugee crisis.</p>

<h3>Religion</h3>
<p>The majority of Lhotshampa practice Hinduism, with significant minorities practicing Buddhism and Kirat religions. Hindu temples and religious festivals were an integral part of community life in southern Bhutan. The celebration of Dashain and Tihar remain central cultural events for the Lhotshampa, both in Bhutan and in the diaspora.</p>

<h3>Dress</h3>
<p>Traditional Lhotshampa dress includes the <em>daura suruwal</em> (a tunic and trousers outfit) and <em>topi</em> (cap) for men, and the <em>sari</em> or <em>gunyu cholo</em> for women. The forced imposition of the Ngalop <em>gho</em> and <em>kira</em> under <em>Driglam Namzha</em> in 1989 was experienced as a direct assault on Lhotshampa cultural identity.</p>

<h3>Food</h3>
<p>Lhotshampa cuisine reflects Nepali culinary traditions, featuring dal (lentil soup), bhat (rice), tarkari (vegetable curry), achar (pickles), and various meat preparations. Gundruk (fermented leafy greens) and dhido (a dense flour preparation) are traditional staples.</p>

<h2>Ethnic Subgroups</h2>
<p>The Lhotshampa are not a monolithic group. They include diverse Nepali-speaking communities:</p>
<ul>
<li><strong>Brahmin and Chhetri:</strong> Upper-caste Hindu groups who often served as teachers, priests, and administrators</li>
<li><strong>Gurung and Rai:</strong> Indigenous Nepali groups with distinct cultural practices and languages</li>
<li><strong>Tamang:</strong> A Tibeto-Burman group with Buddhist traditions</li>
<li><strong>Dalit communities:</strong> Including Kami (blacksmiths), Damai (tailors/musicians), and Sarki (cobblers), who faced both caste discrimination and ethnic persecution</li>
</ul>

<h2>The Diaspora</h2>
<p>Following the mass expulsion of the 1990s, the Lhotshampa are now a truly global community. Major diaspora populations exist in:</p>
<ul>
<li><strong>United States:</strong> ~96,000 resettled across multiple states, with large communities in Ohio, Pennsylvania, Georgia, Texas, and New York</li>
<li><strong>Canada, Australia, New Zealand:</strong> Smaller but growing communities</li>
<li><strong>Nepal and India:</strong> Some refugees remain, including those who chose not to resettle or were unable to</li>
</ul>
<p>The diaspora community has established cultural organizations, temples, community centers, and media outlets to preserve and transmit Lhotshampa heritage to younger generations born outside Bhutan.</p>

<h2>Current Situation in Bhutan</h2>
<p>A small Lhotshampa population remains in Bhutan, estimated at 10-20% of the current population. Their situation remains constrained: cultural expression is limited, political participation is circumscribed, and the government continues to deny that the expulsions constituted ethnic cleansing.</p>`,
    status: 'published',
  },
  {
    slug: 'tek-nath-rizal',
    title: 'Tek Nath Rizal',
    category: 'people',
    summary:
      'Tek Nath Rizal is a Bhutanese human rights activist and political leader who was imprisoned for over a decade for advocating for the rights of the Lhotshampa people. He is widely regarded as a central figure in the struggle for ethnic justice in Bhutan.',
    content_md: `<h2>Overview</h2>
<p>Tek Nath Rizal (born 1956) is a Bhutanese political activist, former member of the Royal Advisory Council, and one of the most prominent advocates for the rights of Bhutan's Lhotshampa minority. He was arrested in 1989, tried and convicted in a widely criticized judicial process, and imprisoned for over a decade. His case drew international attention and became emblematic of Bhutan's persecution of its ethnic Nepali-speaking citizens.</p>

<h2>Early Life and Career</h2>
<p>Rizal was born in Chirang (now Tsirang) district in southern Bhutan. He was educated in Bhutan and India, and became a civil servant in the Bhutanese government. In 1988, he was elected as a member of the Royal Advisory Council (<em>Lodoi Tshogde</em>), the highest advisory body to the King — a remarkable achievement for a Lhotshampa at a time of growing ethnic tensions.</p>

<h2>Activism</h2>
<p>As a member of the Royal Advisory Council, Rizal used his position to raise concerns about the impact of the 1985 Citizenship Act and the 1988 census on the Lhotshampa population. He submitted petitions to King Jigme Singye Wangchuck requesting a review of policies that were stripping citizenship from southern Bhutanese.</p>
<p>In 1988, Rizal wrote a letter to the King describing the hardships faced by Lhotshampa in the wake of the citizenship reclassification. He appealed for dialogue, moderation, and the protection of minority rights. Rather than engaging with his concerns, the government viewed his advocacy as sedition.</p>

<h2>Arrest and Imprisonment</h2>
<p>In November 1989, Rizal was arrested by Bhutanese authorities in Nepal, where he had traveled, and forcibly brought back to Bhutan. He was charged with "anti-national activities" — a charge that amounted to his having peacefully advocated for the civil rights of the Lhotshampa.</p>
<p>Rizal was held in detention for years before being tried. During his imprisonment, he was reportedly subjected to torture and solitary confinement. In 1993, he was sentenced to life imprisonment by a special court in a trial that lacked basic due process protections.</p>
<p>His case was taken up by Amnesty International, which designated him a prisoner of conscience. International pressure, including from the United Nations and various human rights organizations, eventually led to a reduction of his sentence.</p>

<h2>Release</h2>
<p>Rizal was released from prison in December 1999 after serving over ten years. Following his release, he continued to advocate for the rights of Bhutanese refugees and the resolution of the refugee crisis. He has lived in Nepal since his release, as returning to Bhutan remains effectively impossible.</p>

<h2>Legacy</h2>
<p>Tek Nath Rizal is widely regarded within the Lhotshampa community as a hero who sacrificed his freedom and safety to speak truth to power. His story illustrates both the courage of those who resisted ethnic cleansing and the severe consequences the Bhutanese state imposed on dissenters.</p>
<p>He has authored several books about the Bhutanese refugee crisis and continues to be an active voice for justice and accountability.</p>`,
    status: 'published',
  },
  {
    slug: 'driglam-namzha',
    title: 'Driglam Namzha',
    category: 'culture',
    summary:
      'Driglam Namzha is the official code of conduct and dress enforced by the Bhutanese government. While framed as the preservation of national identity, its mandatory enforcement from 1989 became a tool of cultural suppression against non-Ngalop ethnic groups, particularly the Lhotshampa.',
    content_md: `<h2>Overview</h2>
<p><em>Driglam Namzha</em> (Dzongkha: སྒྲིག་ལམ་རྣམ་གཞག) translates roughly as "the rules of disciplined behavior" or "the way of ordered conduct." It is the Bhutanese code of etiquette, dress, and social conduct rooted in Ngalop (western Bhutanese) Buddhist traditions. While aspects of <em>Driglam Namzha</em> have existed for centuries, its codification and mandatory nationwide enforcement beginning in 1989 transformed it from a cultural tradition into a political instrument.</p>

<h2>Historical Roots</h2>
<p><em>Driglam Namzha</em> traces its origins to the 17th-century unifier of Bhutan, Zhabdrung Ngawang Namgyal, who established codes of conduct as part of his effort to create a unified Bhutanese state. These codes governed dress, architecture, religious observance, and social behavior, and were traditionally associated with the Ngalop people of western Bhutan.</p>

<h2>The 1989 Enforcement</h2>
<p>In 1989, under King Jigme Singye Wangchuck, <em>Driglam Namzha</em> was made mandatory for all Bhutanese citizens, regardless of ethnic background. Key requirements included:</p>
<ul>
<li><strong>Dress:</strong> All citizens were required to wear the <em>gho</em> (a knee-length robe for men) and <em>kira</em> (an ankle-length dress for women) — traditional garments of the Ngalop — in all public settings, government offices, schools, and official functions</li>
<li><strong>Language:</strong> Dzongkha was promoted as the sole national language. Nepali was removed from the school curriculum in southern Bhutan</li>
<li><strong>Architecture:</strong> All buildings were required to follow traditional Bhutanese (Ngalop) architectural styles</li>
<li><strong>Cultural practices:</strong> Hindu festivals and cultural practices of the Lhotshampa faced increasing restrictions</li>
</ul>

<h2>Impact on Non-Ngalop Groups</h2>
<p>For the Lhotshampa, the enforcement of <em>Driglam Namzha</em> was experienced as cultural erasure:</p>
<ul>
<li>Men were forced to abandon the <em>daura suruwal</em> and <em>topi</em> and wear the <em>gho</em></li>
<li>Women could no longer wear the <em>sari</em> or <em>gunyu cholo</em> publicly</li>
<li>Children could no longer learn in Nepali at school</li>
<li>Hindu religious practices were marginalized</li>
<li>Non-compliance was punishable by fines, imprisonment, or denial of government services</li>
</ul>
<p>For the Sharchop people of eastern Bhutan, who have their own distinct cultural traditions, <em>Driglam Namzha</em> similarly imposed Ngalop norms, though the impact was less severe due to closer cultural ties with the Ngalop.</p>

<h2>"One Nation, One People"</h2>
<p>The enforcement of <em>Driglam Namzha</em> was part of a broader "One Nation, One People" policy that sought to create a homogeneous national identity based on Ngalop culture. Critics, including human rights organizations, have characterized this policy as forced assimilation — an attempt to erase the ethnic and cultural diversity that had long characterized Bhutan.</p>

<h2>Contemporary Status</h2>
<p><em>Driglam Namzha</em> remains enforced in Bhutan today. The dress code is mandatory in schools, government offices, and during official events. While some relaxation has occurred in informal settings, the policy continues to represent the dominance of Ngalop cultural norms in Bhutanese national identity.</p>

<h2>Debate</h2>
<p>Supporters of <em>Driglam Namzha</em> argue it preserves Bhutanese cultural identity in the face of globalization. Critics counter that it conflates one ethnic group's traditions with "national identity" and was used as a weapon of cultural suppression against minorities. The truth of these competing perspectives is central to understanding Bhutan's ethnic conflicts.</p>`,
    status: 'published',
  },
  {
    slug: 'gross-national-happiness',
    title: 'Gross National Happiness',
    category: 'politics',
    summary:
      'Gross National Happiness (GNH) is Bhutan\'s signature development philosophy, prioritizing collective well-being over economic growth. While internationally celebrated, critics argue it serves as a public relations shield that obscures the country\'s record of ethnic cleansing, political repression, and restricted freedoms.',
    content_md: `<h2>Overview</h2>
<p>Gross National Happiness (GNH) is a development philosophy attributed to Bhutan's Fourth King, Jigme Singye Wangchuck, who reportedly declared in 1972 that "Gross National Happiness is more important than Gross National Product." The concept has since become Bhutan's most recognized international brand, attracting admiration from world leaders, development economists, and media outlets worldwide.</p>
<p>GNH is built on four pillars: sustainable and equitable socio-economic development, environmental conservation, preservation and promotion of culture, and good governance. It is operationalized through nine domains, including psychological well-being, health, education, and living standards.</p>

<h2>The Framework</h2>
<h3>Four Pillars</h3>
<ul>
<li><strong>Sustainable and equitable socio-economic development</strong></li>
<li><strong>Environmental conservation</strong></li>
<li><strong>Preservation and promotion of culture</strong></li>
<li><strong>Good governance</strong></li>
</ul>

<h3>Nine Domains</h3>
<p>The GNH Index measures well-being across: psychological well-being, health, time use, education, cultural resilience and promotion, good governance, community vitality, ecological diversity and resilience, and living standards.</p>

<h2>International Reception</h2>
<p>GNH has received widespread international acclaim. The United Nations adopted a resolution in 2011 recognizing happiness as a "fundamental human goal" and inviting member states to develop measures of well-being. Bhutan has hosted international conferences on GNH and been featured in countless positive media profiles.</p>
<p>The concept has inspired similar initiatives in other countries and has been praised as a visionary alternative to GDP-focused development models.</p>

<h2>Critical Perspectives</h2>
<p>Despite its international appeal, GNH has faced significant criticism, particularly from the Bhutanese refugee community and human rights organizations:</p>

<h3>GNH and the Refugee Crisis</h3>
<p>The most fundamental critique of GNH is the timing of its promotion. Bhutan's international GNH campaign intensified during the same period the government was expelling over 100,000 Lhotshampa citizens. Critics argue that GNH served as a deliberate distraction — a carefully crafted national brand designed to draw international attention away from ethnic cleansing.</p>
<p>As scholars have noted, a philosophy claiming to measure national happiness rings hollow when the government has forcibly removed a significant portion of its population and then measured the "happiness" of those who remain.</p>

<h3>Cultural Homogeneity</h3>
<p>The "preservation and promotion of culture" pillar of GNH has been criticized for equating Ngalop Buddhist culture with "Bhutanese culture." The enforcement of <em>Driglam Namzha</em> — which suppressed Lhotshampa and Sharchop cultural practices — was carried out under the same cultural preservation framework that GNH celebrates.</p>

<h3>Limited Freedoms</h3>
<p>Bhutan's GNH framework coexists with significant restrictions on press freedom, political dissent, and civil liberties. There is no independent media, political opposition operates within narrow bounds, and civil society organizations are constrained. Critics ask whether genuine happiness is possible without basic freedoms.</p>

<h3>Measurement Concerns</h3>
<p>Methodological critiques note that the GNH survey is administered by the government to its own citizens, raising questions about response bias. The displaced Lhotshampa population — who might be expected to report the lowest levels of happiness — are excluded from the survey entirely, having been removed from the country.</p>

<h2>Balanced Assessment</h2>
<p>GNH as a philosophical concept — the idea that development should consider well-being beyond economic metrics — has genuine merit. However, its application in Bhutan must be understood in the context of the country's political history. The international community's uncritical embrace of GNH has arguably made it harder to hold Bhutan accountable for its human rights record.</p>`,
    status: 'published',
  },
  {
    slug: 'human-rights-in-bhutan',
    title: 'Human Rights in Bhutan',
    category: 'politics',
    summary:
      'Bhutan\'s human rights record includes the ethnic cleansing of over 100,000 Lhotshampa, restrictions on press freedom and political dissent, and the enforcement of cultural homogenization policies. Despite its image as a peaceful Buddhist kingdom, Bhutan faces serious and documented human rights concerns.',
    content_md: `<h2>Overview</h2>
<p>Bhutan's human rights situation presents a stark contrast between the country's international image as a peaceful, happy Buddhist kingdom and the documented reality of ethnic persecution, restricted freedoms, and limited civil liberties. While Bhutan has made some progress in areas such as education and healthcare, serious human rights concerns persist.</p>

<h2>Ethnic Cleansing and Refugee Crisis</h2>
<p>The most significant human rights violation in Bhutan's modern history is the forced expulsion of over 100,000 Lhotshampa in the late 1980s and 1990s. This campaign of ethnic cleansing involved:</p>
<ul>
<li>Retroactive revocation of citizenship through the 1985 Citizenship Act</li>
<li>Forced cultural assimilation through <em>Driglam Namzha</em></li>
<li>Arbitrary arrest, detention, and torture of political dissidents</li>
<li>Destruction of homes and confiscation of property</li>
<li>Forced signing of "voluntary emigration" documents</li>
<li>Sexual violence against women during the expulsion period</li>
</ul>
<p>Amnesty International, Human Rights Watch, and the U.S. State Department have all documented these abuses. The Bhutanese government has never acknowledged them or accepted responsibility.</p>

<h2>Freedom of Expression</h2>
<p>Bhutan has no independent media. All domestic newspapers and broadcast outlets operate under government oversight. The 2006 Media Act provides for press freedom in principle, but in practice, journalists practice extensive self-censorship. Critical reporting on the monarchy, the military, or sensitive political topics is effectively impossible.</p>
<p>Internet access, while growing, remains limited and monitored. Social media has created some space for discussion, but users have been arrested for posts deemed critical of the government.</p>

<h2>Political Rights</h2>
<p>Bhutan transitioned from an absolute monarchy to a constitutional monarchy in 2008, with the introduction of parliamentary elections. However:</p>
<ul>
<li>The King retains significant executive power, including the ability to dissolve parliament</li>
<li>Political parties must be approved by the Election Commission and operate within narrow ideological bounds</li>
<li>Former political prisoners and refugees are effectively barred from political participation</li>
<li>Genuine political opposition is limited</li>
</ul>

<h2>Religious Freedom</h2>
<p>While the constitution provides for freedom of religion, Buddhism (specifically the Drukpa Kagyu school) is the state religion and receives official support. Proselytization is illegal. Hindu practices of the Lhotshampa have been restricted, and the construction of Hindu temples has faced obstacles.</p>

<h2>LGBTQ+ Rights</h2>
<p>Same-sex sexual activity was criminalized under Bhutan's penal code until 2021, when parliament voted to decriminalize it. While this was a positive step, social acceptance remains limited, and there are no anti-discrimination protections for LGBTQ+ individuals.</p>

<h2>Women's Rights</h2>
<p>Bhutan has a mixed record on women's rights. Women have relatively high participation in education and some economic sectors, and Bhutanese inheritance traditions are more egalitarian than in some neighboring countries. However, domestic violence remains prevalent, women are underrepresented in politics and senior government positions, and women from the Lhotshampa community faced particular vulnerability during the refugee crisis.</p>

<h2>International Engagement</h2>
<p>Bhutan is a member of the United Nations and has ratified some international human rights treaties, including the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW) and the Convention on the Rights of the Child (CRC). However, it has not ratified the International Covenant on Civil and Political Rights (ICCPR) or the International Covenant on Economic, Social and Cultural Rights (ICESCR).</p>`,
    status: 'published',
  },
  {
    slug: 'languages-of-bhutan',
    title: 'Languages of Bhutan',
    category: 'culture',
    summary:
      'Bhutan is home to at least 19 languages across three language families, yet Dzongkha is the sole national language. The suppression of Nepali and other minority languages has been a significant aspect of the country\'s cultural policies and ethnic conflicts.',
    content_md: `<h2>Overview</h2>
<p>Despite its small population of approximately 780,000, Bhutan is remarkably linguistically diverse, with at least 19 documented languages. These languages span three major language families: Sino-Tibetan (Tibeto-Burman branch), Indo-European (Indo-Aryan branch), and a small number of other linguistic traditions. However, this diversity exists in tension with the government's promotion of Dzongkha as the sole national language.</p>

<h2>Dzongkha</h2>
<p>Dzongkha (རྫོང་ཁ) is the national and official language of Bhutan. It belongs to the Tibeto-Burman language family and is closely related to Tibetan. Dzongkha is the native language of the Ngalop people of western Bhutan and is written in the Tibetan script (<em>Uchen</em>).</p>
<p>While Dzongkha is the language of government, education, and official life, it is the first language of only a minority of Bhutanese — estimates vary, but likely 20-25% of the population. Its elevation as the sole national language is a political choice that reflects Ngalop cultural dominance.</p>

<h2>Nepali (Lhotshamkha)</h2>
<p>Nepali, known in Bhutan as Lhotshamkha ("language of the southerners"), was historically the primary language of the Lhotshampa community in southern Bhutan. It was taught in schools in southern districts until 1989, when it was removed from the curriculum as part of the <em>Driglam Namzha</em> enforcement.</p>
<p>The suppression of Nepali in Bhutan was a central component of the cultural homogenization policies that preceded the refugee crisis. Today, Nepali remains spoken by the Lhotshampa who remain in southern Bhutan and is a vital language of the diaspora community worldwide.</p>

<h2>Sharchopkha (Tshangla)</h2>
<p>Sharchopkha, also known as Tshangla, is the language of the Sharchop people of eastern Bhutan. It is actually the most widely spoken native language in Bhutan, used by approximately 30-40% of the population. Despite this, Sharchopkha has no official status and is not used in formal education or government.</p>

<h2>Other Languages</h2>
<p>Bhutan's linguistic landscape includes numerous other languages:</p>
<ul>
<li><strong>Bumthang languages:</strong> A group of related Tibeto-Burman languages spoken in the central districts, including Bumthangkha, Khengkha, Kurtöpkha, and Mangdekha</li>
<li><strong>Cho-ca-nga-ca-kha:</strong> Spoken in parts of southern Bhutan</li>
<li><strong>Lepcha:</strong> An ancient language with its own script, spoken by a small community</li>
<li><strong>Various other Tibeto-Burman languages:</strong> Including Lakha, Brokkat, and others spoken by small communities</li>
</ul>

<h2>Language Policy</h2>
<p>Bhutan's language policy has been consistently oriented toward promoting Dzongkha at the expense of other languages. English serves as the medium of instruction in schools alongside Dzongkha, while indigenous minority languages receive no formal support. This policy raises concerns about language endangerment — several of Bhutan's smaller languages are at risk of disappearing within a generation.</p>

<h2>Language in the Diaspora</h2>
<p>For the Bhutanese refugee diaspora, language maintenance is a pressing concern. While the first generation maintains fluency in Nepali and sometimes other Bhutanese languages, younger generations raised in the US, Canada, and Australia increasingly speak English as their primary language. Community organizations have established Nepali language schools and cultural programs to ensure intergenerational language transmission.</p>`,
    status: 'published',
  },
  {
    slug: 'refugee-camps-in-nepal',
    title: 'Refugee Camps in Nepal',
    category: 'diaspora',
    summary:
      'Seven UNHCR-administered refugee camps in southeastern Nepal housed over 108,000 Bhutanese refugees for nearly two decades. The camps became a crucible of community organizing, cultural preservation, and resilience in the face of protracted displacement.',
    content_md: `<h2>Overview</h2>
<p>Beginning in 1991, Bhutanese refugees fleeing ethnic cleansing crossed into southeastern Nepal, where they were housed in camps administered by the United Nations High Commissioner for Refugees (UNHCR). At their peak, seven camps in the Jhapa and Morang districts sheltered over 108,000 people. These camps became one of the world's most protracted refugee situations, with many residents living there for nearly 20 years before resettlement.</p>

<h2>The Seven Camps</h2>
<ul>
<li><strong>Beldangi I, II, and III (Extension):</strong> The largest camp complex, located in Jhapa district, housing over 40,000 refugees at peak</li>
<li><strong>Goldhap:</strong> Located in Jhapa district</li>
<li><strong>Khudunabari:</strong> Located in Jhapa district</li>
<li><strong>Sanischare:</strong> Located in Morang district</li>
<li><strong>Timai:</strong> Located in Jhapa district</li>
</ul>

<h2>Living Conditions</h2>
<p>Camp conditions were basic but organized. UNHCR and partner organizations (including the World Food Programme, Lutheran World Federation, and CARITAS) provided:</p>
<ul>
<li>Bamboo and plastic sheeting shelters organized into sectors and subsectors</li>
<li>Monthly food rations (rice, lentils, oil, salt, sugar)</li>
<li>Basic healthcare through camp health centers</li>
<li>Primary and secondary education</li>
<li>Clean water and sanitation facilities</li>
</ul>
<p>Despite these provisions, life in the camps was marked by overcrowding, limited economic opportunities, restricted movement, and the psychological toll of prolonged displacement and uncertainty.</p>

<h2>Community Life</h2>
<p>The refugees built remarkable community structures within the camps:</p>
<ul>
<li><strong>Education:</strong> Camp schools educated an entire generation, producing high literacy rates and a strong emphasis on learning. Many camp-educated youth have gone on to achieve academic and professional success in resettlement countries</li>
<li><strong>Cultural preservation:</strong> Community groups organized festivals (Dashain, Tihar, Holi), maintained religious practices, and created cultural programs to transmit traditions to camp-born children</li>
<li><strong>Community organizations:</strong> Camp management committees, women's groups, youth organizations, and human rights committees were established and run by refugees themselves</li>
<li><strong>Media:</strong> Camp-based publications and radio programs kept the community informed and connected</li>
</ul>

<h2>Failed Bilateral Negotiations</h2>
<p>Between 1993 and 2003, Bhutan and Nepal conducted 15 rounds of bilateral talks to resolve the refugee situation. A Joint Verification Team was established to categorize refugees and determine eligibility for repatriation. Of the approximately 12,000 refugees in one sample camp (Khudunabari), the team classified the vast majority as "voluntary emigrants" — using the coerced documents refugees had been forced to sign during expulsion as evidence.</p>
<p>The negotiations collapsed without result. Bhutan showed no genuine willingness to allow meaningful repatriation, and the refugees rejected the categorizations as fraudulent.</p>

<h2>Third Country Resettlement</h2>
<p>In 2007, facing the failure of repatriation efforts and the humanitarian need to end protracted displacement, the international community launched a third-country resettlement program. Eight countries agreed to accept refugees:</p>
<ul>
<li>United States (the vast majority — over 96,000)</li>
<li>Canada</li>
<li>Australia</li>
<li>New Zealand</li>
<li>Norway</li>
<li>Denmark</li>
<li>Netherlands</li>
<li>United Kingdom</li>
</ul>

<h2>Camp Closure</h2>
<p>As resettlement progressed, camps gradually emptied and closed. By the mid-2010s, most camps had been consolidated or closed. A small number of refugees who chose not to resettle or were ineligible remain in Nepal, their long-term status still unresolved.</p>

<h2>Legacy</h2>
<p>The refugee camps represent both a painful chapter and a testament to community resilience. The generation that grew up in the camps — educated in camp schools, raised on stories of a homeland they barely knew — now forms the backbone of the global Bhutanese diaspora. Their experience of displacement, community building, and eventual resettlement is a story that demands documentation and preservation.</p>`,
    status: 'published',
  },
  {
    slug: 'media-and-press-freedom-in-bhutan',
    title: 'Media and Press Freedom in Bhutan',
    category: 'society',
    summary:
      'Bhutan has no independent media. All domestic press operates under state oversight, genuine investigative journalism is effectively impossible, and critical voices face severe consequences. Despite constitutional provisions for press freedom, Bhutan remains one of the most information-controlled nations on earth.',
    content_md: `<h2>Overview</h2>
<p>Bhutan's media landscape is characterized by a fundamental contradiction: the 2008 Constitution guarantees freedom of the press, yet the country has no truly independent media. All domestic newspapers and broadcast outlets operate within boundaries defined by the state, and critical journalism on sensitive topics — the monarchy, the military, the refugee crisis, ethnic relations — is effectively nonexistent within Bhutan.</p>

<h2>Media Landscape</h2>
<h3>Print Media</h3>
<p>Bhutan has a small number of newspapers, including <em>Kuensel</em> (the oldest, originally a government bulletin), <em>Bhutan Times</em>, <em>Bhutan Observer</em>, and <em>The Bhutanese</em>. While some private newspapers have been established since the early 2000s, all operate within an environment of heavy self-censorship. Investigative reporting on politically sensitive issues is rare.</p>

<h3>Broadcast Media</h3>
<p>The Bhutan Broadcasting Service (BBS) is the state-owned radio and television broadcaster. It serves as the primary broadcast news source and hews closely to government messaging. There is no independent broadcast media.</p>

<h3>Internet and Social Media</h3>
<p>Internet access in Bhutan has grown significantly since its introduction in 1999, and social media (particularly Facebook) has become an important communication channel. However, users have faced consequences for online criticism of the government, and the small size of Bhutanese society means that online anonymity is difficult to maintain.</p>

<h2>Legal Framework</h2>
<p>The 2006 Bhutan Information, Communications and Media Act provides the legal framework for media operations. While it contains provisions for press freedom, it also includes broad restrictions on content that could be deemed to affect "national security," "sovereignty," or "the unity of the people" — language vague enough to encompass almost any critical reporting.</p>

<h2>Self-Censorship</h2>
<p>The most powerful constraint on Bhutanese media is not formal censorship but pervasive self-censorship. Journalists understand the boundaries of acceptable reporting and rarely test them. Topics that are effectively off-limits include:</p>
<ul>
<li>Direct criticism of the King or royal family</li>
<li>The refugee crisis and ethnic cleansing (rarely mentioned in domestic media)</li>
<li>Military and security operations</li>
<li>Corruption at senior government levels</li>
<li>Genuine political opposition or alternative governance models</li>
</ul>

<h2>International Rankings</h2>
<p>Reporters Without Borders (RSF) has consistently placed Bhutan in the middle-to-lower range of its World Press Freedom Index, noting the absence of independent media and the culture of self-censorship. While Bhutan avoids the violent suppression of journalists seen in some countries, the structural constraints on press freedom are severe.</p>

<h2>Diaspora Media</h2>
<p>The most critical and independent coverage of Bhutan comes from diaspora media outlets:</p>
<ul>
<li><strong>Bhutan News Service (BNS):</strong> An independent online news outlet run by Bhutanese refugees, providing critical coverage of Bhutanese politics and refugee issues</li>
<li><strong>The Bhutanese (diaspora edition):</strong> Covering news relevant to the global Bhutanese community</li>
<li><strong>Various community blogs and social media:</strong> Diaspora community members produce significant amounts of commentary, analysis, and reporting</li>
</ul>
<p>These outlets operate from outside Bhutan and provide perspectives that are completely absent from domestic media.</p>

<h2>Implications</h2>
<p>The absence of independent media in Bhutan has profound consequences. It means that the primary narrative about Bhutan available to the world — the Gross National Happiness story, the image of a peaceful and happy kingdom — is largely produced or filtered by the state. Counter-narratives, including the refugee experience, rely on diaspora voices and international human rights organizations for amplification.</p>
<p>This information asymmetry is a key reason BhutanWiki exists: to create a space where the full range of perspectives on Bhutan can be documented, including those that the state-controlled media will not publish.</p>`,
    status: 'published',
  },
]

async function seed() {
  console.log('Creating seed contributor...')

  const { data: contributor, error: contribError } = await supabase
    .from('contributors')
    .insert({
      display_name: 'BhutanWiki Editorial',
      role: 'editor',
      is_anonymous: false,
    })
    .select()
    .single()

  if (contribError) {
    console.error('Failed to create contributor:', contribError.message)
    return
  }

  console.log(`Created contributor: ${contributor.display_name} (${contributor.id})`)

  for (const article of articles) {
    console.log(`Creating article: ${article.title}...`)

    const { data, error } = await supabase
      .from('articles')
      .insert({
        slug: article.slug,
        title: article.title,
        category: article.category,
        summary: article.summary,
        content_md: article.content_md,
        status: article.status,
        created_by: contributor.id,
      })
      .select()
      .single()

    if (error) {
      console.error(`  Failed: ${error.message}`)
      continue
    }

    // Create version 1
    await supabase.from('article_versions').insert({
      article_id: data.id,
      version_number: 1,
      content_md: article.content_md,
      edit_summary: 'Initial creation',
      edited_by: contributor.id,
    })

    console.log(`  Done: /articles/${article.slug}`)
  }

  console.log('\nSeeding complete!')
}

seed()
