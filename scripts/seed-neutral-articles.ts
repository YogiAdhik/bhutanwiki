import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const articles = [
  // ===== MONARCHS =====
  {
    slug: 'wangchuck-dynasty',
    title: 'The Wangchuck Dynasty',
    category: 'history',
    summary:
      'The Wangchuck dynasty has ruled Bhutan since 1907, when Ugyen Wangchuck was elected as the first hereditary monarch, ending centuries of dual theocratic-civil governance. Five kings have ruled across more than a century, transforming Bhutan from an isolated feudal state to a constitutional monarchy.',
    content_md: `<h2>Overview</h2>
<p>The House of Wangchuck is the ruling royal family of Bhutan. The dynasty was established in 1907 when Ugyen Wangchuck, the <em>Penlop</em> (governor) of Trongsa, was unanimously elected as the first Druk Gyalpo (Dragon King) by an assembly of monks, government officials, and heads of prominent families. This event ended the era of competing regional governors and established the hereditary monarchy that continues today.</p>
<p>Under the Wangchuck dynasty, Bhutan has undergone a dramatic transformation — from a medieval, largely isolated kingdom to a modern state with international relations, a written constitution, and democratic institutions, while retaining significant royal authority.</p>

<h2>The Five Kings</h2>
<ul>
<li><strong>Ugyen Wangchuck</strong> (r. 1907–1926) — First King, unifier</li>
<li><strong>Jigme Wangchuck</strong> (r. 1926–1952) — Second King, consolidator</li>
<li><strong>Jigme Dorji Wangchuck</strong> (r. 1952–1972) — Third King, modernizer</li>
<li><strong>Jigme Singye Wangchuck</strong> (r. 1972–2006) — Fourth King, architect of GNH and democratic transition</li>
<li><strong>Jigme Khesar Namgyel Wangchuck</strong> (r. 2006–present) — Fifth King, constitutional monarch</li>
</ul>

<h2>Pre-Dynasty Governance</h2>
<p>Before 1907, Bhutan was governed under a dual system established by Zhabdrung Ngawang Namgyal in the 17th century: a <em>Je Khenpo</em> (chief abbot) oversaw religious affairs, while a <em>Druk Desi</em> (temporal ruler) managed civil governance. By the 19th century, this system had fragmented, with powerful regional governors (<em>penlops</em>) competing for influence and the office of Druk Desi becoming largely ceremonial.</p>

<h2>Legacy</h2>
<p>The Wangchuck monarchs are credited with unifying Bhutan, modernizing its infrastructure and institutions, and navigating the country's sovereignty through the complex geopolitics of South Asia. However, the dynasty also presided over the ethnic cleansing of the Lhotshampa in the late 1980s and 1990s, the enforcement of cultural homogenization policies, and the maintenance of a political system in which genuine dissent remains constrained.</p>`,
    status: 'published',
  },
  {
    slug: 'ugyen-wangchuck',
    title: 'Ugyen Wangchuck',
    category: 'people',
    summary:
      'Ugyen Wangchuck (1862–1926) was the first Druk Gyalpo (King) of Bhutan, founding the Wangchuck dynasty in 1907. A skilled military leader and diplomat, he consolidated power over rival governors and established Bhutan\'s hereditary monarchy.',
    content_md: `<h2>Overview</h2>
<p>Sir Ugyen Wangchuck (1862–1926) was the founder and first monarch of the Wangchuck dynasty of Bhutan. Before becoming king, he served as the Penlop (governor) of Trongsa, the most powerful regional governorship in Bhutan. Through military prowess, political alliances, and diplomatic skill — including a critical relationship with British India — he unified the country under his authority and was crowned the first hereditary Druk Gyalpo on December 17, 1907.</p>

<h2>Rise to Power</h2>
<p>Ugyen Wangchuck was born into an influential family in central Bhutan. His father, Jigme Namgyal, had served as the Penlop of Trongsa and briefly as Druk Desi. Ugyen inherited the Trongsa Penlop position and used it as a base to extend his influence across the country.</p>
<p>In the late 19th century, Bhutan was riven by civil conflicts between regional governors. Ugyen Wangchuck emerged victorious from a series of battles, most notably defeating his rivals at the Battle of Changlimithang in 1885. This decisive victory established him as the dominant political figure in Bhutan.</p>

<h2>Relations with British India</h2>
<p>Ugyen Wangchuck cultivated a strategic relationship with British India, serving as a mediator during the British expedition to Tibet in 1903–1904 (the Younghusband Expedition). His diplomatic services earned him the Knight Commander of the Indian Empire (KCIE) from the British Crown in 1905 — recognition that enhanced his prestige domestically and internationally.</p>

<h2>Coronation</h2>
<p>On December 17, 1907, an assembly of representatives from across Bhutan unanimously elected Ugyen Wangchuck as the first hereditary King of Bhutan, ending the fragmented dual governance system. The Treaty of Punakha in 1910 formalized Bhutan's relationship with British India, with Bhutan agreeing to be guided by British advice in external affairs in exchange for non-interference in internal matters.</p>

<h2>Reign and Legacy</h2>
<p>Ugyen Wangchuck ruled until his death in 1926. His reign was characterized by the consolidation of central authority, the pacification of regional rivalries, and the establishment of Bhutan as a unified nation-state under hereditary monarchy. December 17 is celebrated as National Day in Bhutan, commemorating his coronation.</p>`,
    status: 'published',
  },
  {
    slug: 'jigme-wangchuck',
    title: 'Jigme Wangchuck',
    category: 'people',
    summary:
      'Jigme Wangchuck (1905–1952) was the second King of Bhutan who consolidated the monarchy established by his father, strengthened central administration, and maintained Bhutan\'s independence during the turbulent period of British withdrawal from South Asia.',
    content_md: `<h2>Overview</h2>
<p>His Majesty Jigme Wangchuck (1905–1952) succeeded his father Ugyen Wangchuck as the second Druk Gyalpo in 1926. His 26-year reign was a period of quiet consolidation, during which he strengthened central government authority, reduced the power of regional governors, and navigated Bhutan through the end of British colonial rule in South Asia and the emergence of independent India and China as Bhutan's giant neighbors.</p>

<h2>Consolidation of Power</h2>
<p>Jigme Wangchuck continued his father's work of centralizing authority. He curtailed the autonomy of regional penlops, bringing them more firmly under royal control. He restructured the administrative system and reinforced the monarchy's position as the supreme authority in Bhutanese governance.</p>
<p>He also strengthened the relationship between the monarchy and the monastic establishment, maintaining the traditional alliance between secular and religious authority that gave the Bhutanese state its legitimacy.</p>

<h2>International Relations</h2>
<p>The most significant geopolitical challenge of Jigme Wangchuck's reign was the transition from British to Indian suzerainty. When India gained independence in 1947, Bhutan needed to establish a new relationship with its southern neighbor. In 1949, Bhutan and India signed the Treaty of Friendship, which replaced the earlier arrangement with British India. The treaty gave India significant influence over Bhutan's foreign affairs while guaranteeing non-interference in internal matters.</p>
<p>The Chinese annexation of Tibet in 1950 dramatically altered Bhutan's security environment, bringing a major power directly to its northern border. This event underscored the importance of Bhutan's relationship with India for its continued independence.</p>

<h2>Legacy</h2>
<p>Jigme Wangchuck is remembered as a stabilizing figure who preserved Bhutan's sovereignty during a period of upheaval in the region. While his reign saw fewer dramatic changes than those of his predecessor or successor, the institutional foundations he laid were essential for the modernization that followed under the Third King.</p>`,
    status: 'published',
  },
  {
    slug: 'jigme-dorji-wangchuck',
    title: 'Jigme Dorji Wangchuck',
    category: 'people',
    summary:
      'Jigme Dorji Wangchuck (1929–1972), the third King of Bhutan, is known as the "Father of Modern Bhutan." He abolished serfdom, established the National Assembly, joined the United Nations, and launched Bhutan\'s first modern development plans.',
    content_md: `<h2>Overview</h2>
<p>His Majesty Jigme Dorji Wangchuck (1929–1972) was the third Druk Gyalpo of Bhutan, reigning from 1952 until his death in 1972. He is widely regarded as the "Father of Modern Bhutan" for his sweeping reforms that transformed the country from a medieval feudal state into a developing modern nation. His reign saw the abolition of serfdom, the creation of democratic institutions, the launch of planned economic development, and Bhutan's entry into the international community.</p>

<h2>Modernization Reforms</h2>
<h3>Abolition of Serfdom</h3>
<p>In 1956, Jigme Dorji Wangchuck abolished serfdom and slavery, freeing bonded laborers and redistributing land to former serfs. This was a revolutionary act that fundamentally altered Bhutanese social structure.</p>

<h3>National Assembly</h3>
<p>In 1953, he established the <em>Tshogdu</em> (National Assembly), Bhutan's first legislative body. While initially advisory, the Assembly represented a significant step toward representative governance, with members drawn from the public, the civil service, and the monastic body.</p>

<h3>Legal Reform</h3>
<p>He codified Bhutan's laws, replacing the patchwork of local customs and decrees with a national legal code. He established the High Court and a system of district courts, creating a more uniform justice system.</p>

<h2>Economic Development</h2>
<p>Under the Third King, Bhutan launched its first Five-Year Development Plan in 1961, with significant assistance from India. The plan focused on building basic infrastructure — roads, schools, hospitals — in a country that had virtually none. The construction of the Paro-Thimphu highway in the 1960s was a landmark achievement, connecting Bhutan's political capital with its only airport.</p>

<h2>International Relations</h2>
<p>Jigme Dorji Wangchuck opened Bhutan to the world. Key milestones included:</p>
<ul>
<li>Joining the Colombo Plan in 1962</li>
<li>Becoming a member of the Universal Postal Union in 1969</li>
<li>Admission to the United Nations in 1971</li>
</ul>
<p>He also moved the capital from Punakha to Thimphu in 1961, establishing a permanent seat of government.</p>

<h2>Assassination Attempt and Death</h2>
<p>In 1964, the Third King survived an assassination attempt linked to a political crisis following the murder of his Prime Minister, Jigme Palden Dorji. The incident exposed tensions within the ruling establishment. Jigme Dorji Wangchuck died of a heart attack in Nairobi, Kenya, in 1972 at the age of 43, leaving his 16-year-old son to succeed him.</p>

<h2>Legacy</h2>
<p>The Third King is remembered as a visionary reformer who single-handedly dragged Bhutan into the modern era while maintaining its sovereignty and cultural identity. Schools, hospitals, and institutions across Bhutan bear his name.</p>`,
    status: 'published',
  },
  {
    slug: 'jigme-singye-wangchuck',
    title: 'Jigme Singye Wangchuck',
    category: 'people',
    summary:
      'Jigme Singye Wangchuck (born 1955) was the fourth King of Bhutan, reigning from 1972 to 2006. He coined the concept of Gross National Happiness and initiated Bhutan\'s transition to constitutional monarchy. His reign also saw the ethnic cleansing of over 100,000 Lhotshampa.',
    content_md: `<h2>Overview</h2>
<p>His Majesty Jigme Singye Wangchuck (born November 11, 1955) served as the fourth Druk Gyalpo of Bhutan from 1972 to 2006. He became king at the age of 16 following his father's sudden death, making him at the time one of the youngest heads of state in the world. His 34-year reign is marked by significant achievements — including the introduction of Gross National Happiness, major infrastructure development, and the voluntary transition to democracy — as well as the forced expulsion of over 100,000 Lhotshampa citizens.</p>

<h2>Early Reign</h2>
<p>Crowned in 1974 at the age of 18 in a ceremony that also marked Bhutan's first opening to foreign media and guests, the young king continued his father's modernization program while maintaining Bhutan's cautious approach to outside engagement.</p>

<h2>Gross National Happiness</h2>
<p>The Fourth King is credited with articulating the philosophy of Gross National Happiness (GNH) in 1972, declaring that "Gross National Happiness is more important than Gross National Product." This concept became Bhutan's guiding development philosophy and its best-known international brand. GNH prioritizes sustainable development, environmental conservation, cultural preservation, and good governance alongside economic growth.</p>

<h2>Development</h2>
<p>Under the Fourth King, Bhutan experienced significant development:</p>
<ul>
<li>Expansion of the road network, schools, and healthcare facilities</li>
<li>Development of hydropower as the primary revenue source</li>
<li>Introduction of television and internet in 1999</li>
<li>Growth of tourism as a controlled but significant economic sector</li>
<li>Establishment of Bhutan's first university</li>
</ul>

<h2>The Refugee Crisis</h2>
<p>The most controversial aspect of the Fourth King's reign was the ethnic cleansing of the Lhotshampa community in the late 1980s and 1990s. Under his rule:</p>
<ul>
<li>The 1985 Citizenship Act retroactively stripped citizenship from tens of thousands of southern Bhutanese</li>
<li><em>Driglam Namzha</em> was enforced nationwide in 1989, suppressing Lhotshampa culture</li>
<li>Peaceful protests in 1990 were met with arrests, torture, and forced expulsions</li>
<li>Over 100,000 Lhotshampa were expelled or fled between 1990 and 1993</li>
</ul>
<p>The Fourth King and his government have never acknowledged responsibility for these events.</p>

<h2>Democratic Transition</h2>
<p>In a move that surprised many, the Fourth King announced in 2001 that Bhutan would transition to a constitutional monarchy with democratic elections. He oversaw the drafting of the Constitution, which was adopted in 2008, and abdicated in favor of his son in December 2006 — before the first democratic elections were held. He stated that democracy was necessary for Bhutan's long-term stability, even though the public had not demanded it.</p>

<h2>Personal Life</h2>
<p>The Fourth King married four sisters — Ashi Dorji Wangmo, Ashi Tshering Pem, Ashi Tshering Yangdon, and Ashi Sangay Choden — in a joint ceremony in 1979. He has multiple children across these marriages, with his eldest son succeeding him as the Fifth King.</p>

<h2>Legacy</h2>
<p>The Fourth King's legacy is deeply complex. He is revered by many Bhutanese for his development achievements, the GNH philosophy, and his voluntary relinquishment of absolute power. At the same time, his reign encompassed one of the most significant episodes of ethnic cleansing in modern Asian history — a contradiction that defines the challenge of writing honest history about Bhutan.</p>`,
    status: 'published',
  },
  {
    slug: 'jigme-khesar-namgyel-wangchuck',
    title: 'Jigme Khesar Namgyel Wangchuck',
    category: 'people',
    summary:
      'Jigme Khesar Namgyel Wangchuck (born 1980) is the fifth and current King of Bhutan. He has reigned as a constitutional monarch since 2006, overseeing the country\'s first democratic elections and its continued modernization.',
    content_md: `<h2>Overview</h2>
<p>His Majesty Jigme Khesar Namgyel Wangchuck (born February 21, 1980) is the current and fifth Druk Gyalpo of Bhutan. He assumed the throne on December 14, 2006, when his father abdicated, and was formally crowned on November 1, 2008. He is Bhutan's first constitutional monarch, governing under the framework of the 2008 Constitution.</p>

<h2>Education</h2>
<p>The Fifth King was educated in Bhutan, India, the United States, and the United Kingdom. He attended Cushing Academy in Massachusetts, Wheaton College in Massachusetts, and Magdalen College at the University of Oxford, where he studied politics. His international education distinguishes him from his predecessors and has influenced his governing style.</p>

<h2>Reign</h2>
<h3>Democratic Governance</h3>
<p>The Fifth King's primary constitutional role has been to oversee the functioning of Bhutan's young democracy. Under the 2008 Constitution, the King serves as Head of State while executive power rests with the elected Prime Minister and Cabinet. However, the monarch retains significant influence and constitutional powers, including command of the armed forces and the ability to dissolve parliament.</p>

<h3>First Elections</h3>
<p>Bhutan held its first National Assembly elections in March 2008, with the Druk Phuensum Tshogpa (DPT) winning a landslide victory. Subsequent elections in 2013, 2018, and 2024 have seen peaceful transfers of power between parties.</p>

<h3>Development Initiatives</h3>
<p>The Fifth King has emphasized:</p>
<ul>
<li>Youth engagement and employment</li>
<li>Environmental sustainability (Bhutan is carbon-negative)</li>
<li>Digital modernization and e-governance</li>
<li>Anti-corruption measures</li>
<li>Gelephu Mindfulness City, an ambitious planned economic zone</li>
</ul>

<h2>Personal Life</h2>
<p>In 2011, he married Jetsun Pema, a commoner from a prominent family. The royal couple has three children. Queen Jetsun Pema has become a popular public figure and is involved in environmental and educational causes. The King is known for his accessibility, frequently traveling to remote parts of Bhutan and engaging directly with citizens.</p>

<h2>International Profile</h2>
<p>The Fifth King has represented Bhutan at numerous international forums and has cultivated relationships with world leaders. He has continued Bhutan's policy of environmental leadership, championing the country's status as a carbon-negative nation and advocating for climate action on the global stage.</p>

<h2>Refugee Issue</h2>
<p>The Fifth King's reign has not seen any meaningful engagement with the legacy of the refugee crisis. The government has not acknowledged the ethnic cleansing, offered compensation, or created any pathway for displaced Lhotshampa to return or reclaim citizenship. The issue remains unaddressed in official Bhutanese discourse.</p>`,
    status: 'published',
  },

  // ===== POLITICAL STRUCTURE =====
  {
    slug: 'government-of-bhutan',
    title: 'Government of Bhutan',
    category: 'politics',
    summary:
      'Bhutan is a constitutional monarchy with a parliamentary democratic system established by the 2008 Constitution. The King serves as Head of State, while executive power rests with an elected Prime Minister and Cabinet. The parliament consists of two chambers: the National Council and the National Assembly.',
    content_md: `<h2>Overview</h2>
<p>The Kingdom of Bhutan operates as a constitutional monarchy with a democratic parliamentary system. This form of government was established by the Constitution of Bhutan, adopted on July 18, 2008. The transition from an absolute monarchy to a constitutional democracy was initiated by the Fourth King, Jigme Singye Wangchuck, and represents one of the few instances in modern history of a ruling monarch voluntarily ceding power to democratic institutions.</p>

<h2>The Monarch</h2>
<p>The Druk Gyalpo (Dragon King) serves as the Head of State and is considered the symbol of national unity. Under the Constitution, the King:</p>
<ul>
<li>Serves as Supreme Commander of the Armed Forces</li>
<li>Holds the power to grant amnesty and pardons</li>
<li>Can declare states of emergency</li>
<li>Appoints key officials, including the Chief Justice and the heads of constitutional bodies</li>
<li>Must abdicate at age 65 in favor of the Crown Prince or Princess</li>
</ul>
<p>While the Constitution limits royal authority compared to the pre-2008 era, the King retains enormous informal influence and public reverence in Bhutanese society.</p>

<h2>Parliament</h2>
<p>Bhutan has a bicameral parliament consisting of:</p>

<h3>National Council (Upper House)</h3>
<p>The <em>Gyelyong Tshogde</em> consists of 25 members: 20 elected (one from each dzongkhag/district) and 5 appointed by the King. Members serve five-year terms. The National Council is a non-partisan body — its members are not permitted to belong to political parties. It serves as a house of review, scrutinizing legislation passed by the National Assembly.</p>

<h3>National Assembly (Lower House)</h3>
<p>The <em>Gyelyong Tshogdu</em> consists of up to 55 members elected from single-member constituencies through a first-past-the-post system. Only two political parties contest the general election — a preliminary round eliminates all but the top two parties. The leader of the majority party becomes Prime Minister.</p>

<h2>Executive</h2>
<p>The Prime Minister heads the <em>Lhengye Zhungtshog</em> (Council of Ministers/Cabinet), which exercises executive authority. Cabinet ministers are appointed by the King on the advice of the Prime Minister from among the members of the National Assembly.</p>

<h2>Judiciary</h2>
<p>The judicial system consists of:</p>
<ul>
<li><strong>Supreme Court:</strong> The highest court of appeal, headed by the Chief Justice</li>
<li><strong>High Court:</strong> Handles appeals from lower courts and cases of constitutional significance</li>
<li><strong>Dzongkhag Courts:</strong> District-level courts handling most civil and criminal cases</li>
<li><strong>Dungkhag Courts:</strong> Sub-district courts for minor matters</li>
</ul>

<h2>Local Government</h2>
<p>Bhutan is divided into 20 dzongkhags (districts), each administered by a <em>Dzongdag</em> (District Administrator) appointed by the central government. Below the district level are <em>gewogs</em> (blocks) governed by elected <em>Gups</em> (headmen) and <em>Mangmi</em> (deputy headmen). Local government elections are held on a non-partisan basis.</p>

<h2>Constitutional Bodies</h2>
<p>Key independent constitutional bodies include:</p>
<ul>
<li><strong>Election Commission of Bhutan:</strong> Oversees elections and political party registration</li>
<li><strong>Royal Audit Authority:</strong> Audits government finances</li>
<li><strong>Anti-Corruption Commission:</strong> Investigates and prosecutes corruption</li>
<li><strong>Royal Civil Service Commission:</strong> Manages the civil service</li>
</ul>

<h2>Political Parties</h2>
<p>Bhutan has had several registered political parties since 2007, though the two-party general election system limits the number that contest final elections. Major parties have included the Druk Phuensum Tshogpa (DPT), People's Democratic Party (PDP), Bhutan Kuen-Nyam Party (BKP), and Druk Nyamrup Tshogpa (DNT).</p>

<h2>Limitations</h2>
<p>While the constitutional framework is comprehensive on paper, critics note several constraints on genuine democracy:</p>
<ul>
<li>The two-party restriction limits voter choice</li>
<li>The King retains significant formal and informal power</li>
<li>Genuine political opposition and critical civil society remain underdeveloped</li>
<li>The refugee community — over 100,000 displaced Bhutanese — has no political representation or participation rights</li>
</ul>`,
    status: 'published',
  },
  {
    slug: 'constitution-of-bhutan',
    title: 'Constitution of Bhutan',
    category: 'politics',
    summary:
      'The Constitution of the Kingdom of Bhutan was adopted on July 18, 2008, establishing Bhutan as a democratic constitutional monarchy. It guarantees fundamental rights, establishes a bicameral parliament, and enshrines Gross National Happiness as a governing principle.',
    content_md: `<h2>Overview</h2>
<p>The Constitution of the Kingdom of Bhutan is the supreme law of Bhutan, adopted on July 18, 2008, during the first session of the newly elected Parliament. It was drafted over several years under the direction of the Fourth King, Jigme Singye Wangchuck, who initiated Bhutan's transition to constitutional democracy. The document draws from multiple constitutional traditions while incorporating distinctly Bhutanese concepts, including the formal enshrinement of Gross National Happiness.</p>

<h2>Structure</h2>
<p>The Constitution consists of 35 articles covering:</p>
<ul>
<li>The Kingdom and its sovereignty</li>
<li>The institution of the monarchy</li>
<li>Spiritual heritage (the role of Buddhism)</li>
<li>Culture and environment</li>
<li>Fundamental rights and duties</li>
<li>Parliament, executive, and judiciary</li>
<li>Elections, political parties, and local government</li>
<li>Constitutional bodies and commissions</li>
</ul>

<h2>Key Provisions</h2>
<h3>Fundamental Rights (Article 7)</h3>
<p>The Constitution guarantees a comprehensive set of rights, including:</p>
<ul>
<li>Right to life, liberty, and security of person</li>
<li>Freedom of speech, opinion, and expression</li>
<li>Freedom of the press, radio, and television</li>
<li>Freedom of religion and belief</li>
<li>Right to vote</li>
<li>Right to equal access and opportunity to join the public service</li>
<li>Right against discrimination based on race, sex, language, religion, politics, or social origin</li>
</ul>

<h3>Fundamental Duties (Article 8)</h3>
<p>The Constitution also outlines duties of citizens, including preserving the sovereignty and territorial integrity of Bhutan, fostering tolerance and respect, and contributing to environmental conservation.</p>

<h3>Monarchy (Article 2)</h3>
<p>The Constitution defines the King as the Head of State and protector of all religions. It mandates abdication at age 65 and provides for a Regency Council if needed. The King can be removed by a two-thirds vote of a joint session of Parliament, though this provision is unprecedented.</p>

<h3>Citizenship (Article 6)</h3>
<p>Citizenship provisions in the Constitution largely mirror the 1985 Citizenship Act, requiring proof of both parents being Bhutanese citizens for citizenship by birth, or residence and other conditions for naturalization. These provisions have been criticized for perpetuating the exclusion of displaced Lhotshampa.</p>

<h2>Drafting Process</h2>
<p>The Constitution was drafted by a committee chaired by the Chief Justice, with input from a nationwide consultation process in which the King personally traveled to all 20 districts to explain the draft to citizens. While the consultation was extensive, critics note that the displaced refugee population was not consulted or included in the process.</p>

<h2>Significance</h2>
<p>The Constitution represents a remarkable event: a ruling monarch voluntarily introducing constraints on his own power and establishing democratic institutions. However, the extent to which the Constitution's provisions — particularly those regarding fundamental rights and press freedom — are realized in practice remains a subject of debate.</p>`,
    status: 'published',
  },

  // ===== HISTORICAL PLACES =====
  {
    slug: 'punakha-dzong',
    title: 'Punakha Dzong',
    category: 'places',
    summary:
      'Punakha Dzong, officially Pungthang Dewa Chhenbi Phodrang ("Palace of Great Happiness"), is one of Bhutan\'s most majestic and historically significant fortresses. Built in 1637-38 by Zhabdrung Ngawang Namgyal, it served as the capital of Bhutan until 1955.',
    content_md: `<h2>Overview</h2>
<p>Punakha Dzong is a stunning fortress-monastery situated at the confluence of the Pho Chhu (Father River) and Mo Chhu (Mother River) in Punakha Valley. It is the second oldest and second largest dzong in Bhutan, and is widely considered the most beautiful. The dzong served as Bhutan's administrative capital and seat of government until 1955, when the capital was moved to Thimphu.</p>

<h2>History</h2>
<p>The dzong was built in 1637–38 by Zhabdrung Ngawang Namgyal, the unifier of Bhutan, at a site where an earlier, smaller structure had existed. According to tradition, the Zhabdrung received a prophecy that a person named "Namgyal" would arrive at a hill shaped like an elephant and build a dzong there.</p>
<p>Punakha Dzong has played a central role in Bhutanese history:</p>
<ul>
<li>It housed the sacred remains of the Zhabdrung for centuries</li>
<li>It was the site of the coronation of Ugyen Wangchuck as the first King in 1907</li>
<li>The royal wedding of the Fifth King, Jigme Khesar Namgyel Wangchuck, to Queen Jetsun Pema was held here in 2011</li>
<li>It remains the winter residence of the <em>Je Khenpo</em> (Chief Abbot) and the central monastic body</li>
</ul>

<h2>Architecture</h2>
<p>The dzong is a masterpiece of traditional Bhutanese architecture. It features:</p>
<ul>
<li>Three <em>docheys</em> (courtyards), each with distinct administrative and religious functions</li>
<li>A towering central <em>utse</em> (tower) housing important temples</li>
<li>Intricate wood carvings, paintings, and gold-leafed roofs</li>
<li>A massive cantilever bridge spanning the Mo Chhu at the entrance</li>
</ul>
<p>The dzong measures approximately 180 meters in length and 72 meters in width, making it one of the largest structures in Bhutan.</p>

<h2>Damage and Restoration</h2>
<p>Punakha Dzong has suffered damage from fires (1986 and earlier), floods, and earthquakes throughout its history. Major restoration work has been carried out multiple times, most recently in the early 2000s, using traditional construction methods and materials.</p>

<h2>Religious Significance</h2>
<p>The dzong houses several important relics and religious objects, including the <em>Rangjung Kharsapani</em>, a sacred image said to have emerged spontaneously from the vertebrae of the Zhabdrung. The annual Punakha <em>Tshechu</em> (festival) and the <em>Punakha Drubchen</em>, which reenacts a 17th-century battle against Tibetan invaders, are major religious and cultural events.</p>

<h2>Visiting</h2>
<p>Punakha Dzong is open to tourists and is one of Bhutan's most visited sites. The dzong is at its most scenic during spring when the surrounding jacaranda trees bloom in purple, and during the annual festivals.</p>`,
    status: 'published',
  },
  {
    slug: 'tigers-nest-paro-taktsang',
    title: "Tiger's Nest (Paro Taktsang)",
    category: 'places',
    summary:
      "Paro Taktsang, commonly known as Tiger's Nest, is a sacred Buddhist monastery perched on a cliff at 3,120 meters above sea level in the Paro Valley. It is Bhutan's most iconic landmark and one of the most recognized images of the Himalayan region.",
    content_md: `<h2>Overview</h2>
<p>Paro Taktsang (དཔར་བཏགས་ཚང, "Tiger's Lair") is a prominent Himalayan Buddhist temple complex clinging to a sheer cliff face 900 meters above the floor of the Paro Valley. Located approximately 10 kilometers north of Paro town, it is Bhutan's most famous landmark, a major pilgrimage site, and the country's single most visited tourist attraction.</p>

<h2>Legend</h2>
<p>According to tradition, Guru Padmasambhava (Guru Rinpoche), the saint who brought Buddhism to Bhutan in the 8th century, flew to this site on the back of a tigress — a manifestation of his consort Yeshe Tsogyal. He meditated in a cave at the site for three years, three months, three weeks, three days, and three hours, subduing evil spirits and sanctifying the area for Buddhism.</p>
<p>The cave where Guru Rinpoche is believed to have meditated remains a sacred space within the temple complex.</p>

<h2>History</h2>
<p>The first temple at the site was built in 1692 by Gyalse Tenzin Rabgye, the fourth <em>Druk Desi</em> (temporal ruler) of Bhutan. The complex has been expanded and renovated multiple times over the centuries.</p>
<p>In April 1998, a devastating fire destroyed the main structure. The cause of the fire remains disputed and was a source of national grief. A painstaking restoration effort, completed in 2005, rebuilt the complex using traditional methods and materials, restoring it to its former grandeur.</p>

<h2>Architecture and Layout</h2>
<p>The complex consists of four main temples and several residential buildings, connected by staircases carved into the rock. Key features include:</p>
<ul>
<li><strong>The main temple:</strong> Built around the original meditation cave, with intricate murals depicting Guru Rinpoche's various manifestations</li>
<li><strong>The Guru Sungjoenma temple:</strong> Housing a statue of Guru Rinpoche</li>
<li><strong>Additional shrines:</strong> Dedicated to various Buddhist deities and historical figures</li>
<li><strong>A waterfall:</strong> Cascading past the complex, feeding a small pool considered holy</li>
</ul>

<h2>The Hike</h2>
<p>Reaching Tiger's Nest requires a hike of approximately 2–3 hours from the trailhead, ascending through blue pine forest. The trail is well-maintained but steep, gaining approximately 900 meters in elevation. A cafeteria at the midpoint offers rest and views. The final approach involves descending into a gorge and climbing back up to the monastery entrance.</p>

<h2>Cultural Significance</h2>
<p>Tiger's Nest is not merely a tourist attraction — it is one of Bhutan's most sacred sites. Bhutanese Buddhists consider a visit to Taktsang a pilgrimage of great spiritual merit. The site is also significant to the broader Tibetan Buddhist world, as Guru Padmasambhava is revered across the Himalayan region.</p>`,
    status: 'published',
  },
  {
    slug: 'tashichho-dzong',
    title: 'Tashichho Dzong',
    category: 'places',
    summary:
      'Tashichho Dzong in Thimphu is the seat of the Bhutanese government, housing the throne room, government ministries, and the summer residence of the central monastic body. It is the political and religious heart of modern Bhutan.',
    content_md: `<h2>Overview</h2>
<p>Tashichho Dzong ("Fortress of the Glorious Religion") is a Buddhist monastery and fortress on the northern edge of the city of Thimphu. It has served as the seat of Bhutan's government since 1952 and houses the throne room of the Druk Gyalpo, several government ministry offices, and the summer residence of the <em>Je Khenpo</em> and the central monastic body (who spend winters at Punakha Dzong).</p>

<h2>History</h2>
<p>The original structure was built in 1216 by Lama Gyalwa Lhanangpa and was initially called Dho-Njon Dzong (Blue Stone Dzong). In 1641, Zhabdrung Ngawang Namgyal took possession of the site and renamed it Tashichho Dzong. The fortress has been rebuilt and expanded multiple times, most significantly in 1962 when the Third King, Jigme Dorji Wangchuck, ordered a complete reconstruction to serve as the new capital's administrative center.</p>

<h2>Architecture</h2>
<p>The current dzong was built in traditional Bhutanese style without modern architectural plans, using traditional construction techniques. It features:</p>
<ul>
<li>Massive whitewashed walls with a distinctive golden roof</li>
<li>A central <em>utse</em> (tower) separating the administrative and monastic wings</li>
<li>The King's throne room, used for formal ceremonies and audiences</li>
<li>Administrative offices for government ministries</li>
<li>Temples and quarters for the central monastic body</li>
<li>Extensive courtyards and gardens</li>
</ul>

<h2>Role Today</h2>
<p>Tashichho Dzong is where the day-to-day business of governing Bhutan takes place. It hosts the annual <em>Thimphu Tshechu</em>, one of Bhutan's most important religious festivals. The dzong is open to tourists in the evening after office hours and during festivals.</p>`,
    status: 'published',
  },

  // ===== ECONOMY, COMPANIES, INDUSTRIES =====
  {
    slug: 'economy-of-bhutan',
    title: 'Economy of Bhutan',
    category: 'society',
    summary:
      'Bhutan has a small, developing economy heavily dependent on hydropower exports to India, agriculture, and tourism. With a GDP of approximately $2.8 billion, it is one of the smallest economies in Asia, guided by the Gross National Happiness development philosophy.',
    content_md: `<h2>Overview</h2>
<p>Bhutan's economy is small, landlocked, and heavily reliant on its economic relationship with India. With a GDP of approximately $2.8 billion and a per capita GDP of around $3,500, Bhutan is classified as a least developed country (LDC) by the United Nations, though it aspires to graduate from this classification. The economy is guided by the Gross National Happiness (GNH) philosophy, which emphasizes balanced development over pure economic growth.</p>

<h2>Hydropower</h2>
<p>Hydropower is the backbone of Bhutan's economy, accounting for a significant portion of government revenue and export earnings. Bhutan's rivers, fed by Himalayan glaciers and monsoon rainfall, provide enormous hydroelectric potential estimated at 30,000 MW, of which only a fraction has been developed.</p>
<p>Major hydropower projects include:</p>
<ul>
<li><strong>Chhukha Hydropower Plant</strong> (336 MW) — Bhutan's first major hydropower project, commissioned in 1986</li>
<li><strong>Tala Hydropower Plant</strong> (1,020 MW) — Completed in 2007, one of the largest in the region</li>
<li><strong>Punatsangchhu-I and II</strong> — Large projects under construction with significant delays</li>
<li><strong>Mangdechhu Hydropower Plant</strong> (720 MW) — Commissioned in 2019</li>
</ul>
<p>Nearly all electricity is exported to India under long-term bilateral agreements, making India both Bhutan's primary economic partner and its largest source of revenue.</p>

<h2>Agriculture</h2>
<p>Agriculture remains the livelihood of the majority of Bhutanese, employing roughly 60% of the population, though its share of GDP has declined to around 15%. Key agricultural products include rice, maize, wheat, barley, cardamom, citrus fruits, apples, and potatoes. Bhutan's agricultural sector is largely subsistence-based, with limited commercialization.</p>
<p>Bhutan has committed to becoming the world's first 100% organic nation, with the National Organic Policy aiming to phase out synthetic chemicals in agriculture.</p>

<h2>Tourism</h2>
<p>Tourism is a significant and growing sector, though it operates under a "high value, low impact" policy. Until 2022, tourists were required to pay a minimum daily tariff (historically $250 per day), which was restructured to a Sustainable Development Fee (SDF) of $100 per person per night. This policy limits visitor numbers while generating revenue for conservation and development.</p>
<p>Tourism in Bhutan focuses on cultural and ecological experiences: monastery visits, festival attendance, trekking, and nature tourism. The sector was severely impacted by the COVID-19 pandemic but has been recovering.</p>

<h2>Industry and Mining</h2>
<p>Bhutan's industrial sector is small, focused primarily on:</p>
<ul>
<li>Cement production</li>
<li>Ferrosilicon and ferroalloy manufacturing</li>
<li>Food processing</li>
<li>Wood and wood products</li>
<li>Mining (dolomite, limestone, gypsum, coal)</li>
</ul>

<h2>Trade</h2>
<p>India dominates Bhutan's trade, accounting for approximately 80-90% of both imports and exports. Bhutan's major exports are electricity, ferrosilicon, cement, cardamom, and dolomite. Major imports include fuel, machinery, vehicles, food products, and construction materials.</p>

<h2>Currency</h2>
<p>Bhutan's currency is the Ngultrum (BTN), which is pegged at par to the Indian Rupee. The Indian Rupee is also accepted as legal tender throughout Bhutan, reflecting the deep economic integration between the two countries.</p>

<h2>Challenges</h2>
<ul>
<li>Youth unemployment is a significant and growing concern</li>
<li>Heavy dependence on India creates economic vulnerability</li>
<li>Limited economic diversification beyond hydropower</li>
<li>Rural-urban migration is depopulating agricultural areas</li>
<li>The country's landlocked geography and difficult terrain increase costs</li>
<li>Climate change threatens both agriculture and hydropower (glacial melt patterns)</li>
</ul>`,
    status: 'published',
  },
  {
    slug: 'druk-air',
    title: 'Druk Air',
    category: 'society',
    summary:
      'Druk Air (Royal Bhutan Airlines) is the national flag carrier of Bhutan and was the country\'s only airline until 2013. It operates from Paro International Airport, one of the world\'s most challenging airports, connecting Bhutan to destinations across Asia.',
    content_md: `<h2>Overview</h2>
<p>Druk Air Corporation Limited, commonly known as Druk Air, is the national airline of Bhutan. Established in 1981 and commencing operations in 1983, it was Bhutan's sole airline for three decades until Bhutan Airlines (Tashi Air) began operations in 2013. Druk Air is wholly owned by the Royal Government of Bhutan and is headquartered in Paro.</p>

<h2>History</h2>
<p>Druk Air was founded in 1981 as part of the Third King's modernization drive. The airline began operations on February 11, 1983, with an 18-seat Dornier 228 aircraft flying between Paro and Kolkata. The airline has since grown significantly, operating modern Airbus aircraft on routes across Asia.</p>

<h2>Operations</h2>
<h3>Hub</h3>
<p>Druk Air operates from Paro International Airport, Bhutan's only international airport. The airport, situated in a deep valley at an elevation of 2,236 meters (7,332 feet) and surrounded by mountains as high as 5,500 meters, is one of the most challenging airports in the world. Only a handful of specially certified pilots are qualified to operate flights into and out of Paro, and operations are restricted to visual flight rules (VFR) — meaning flights can only operate in clear weather during daylight hours.</p>

<h3>Destinations</h3>
<p>Druk Air connects Bhutan to several regional destinations, including:</p>
<ul>
<li>Bangkok (Thailand)</li>
<li>Delhi, Kolkata, Mumbai, Guwahati, Bagdogra (India)</li>
<li>Kathmandu (Nepal)</li>
<li>Dhaka (Bangladesh)</li>
<li>Singapore</li>
</ul>

<h3>Fleet</h3>
<p>Druk Air operates a small fleet of Airbus A319 and A320 aircraft, configured for the short-to-medium-haul routes that characterize its network.</p>

<h2>Domestic Flights</h2>
<p>In addition to international services, Druk Air operates domestic flights to Bumthang (Bathpalathang Airport), Yongphula Airport in Trashigang, and Gelephu (Gelephu Domestic Airport), connecting remote eastern and southern regions to the western part of the country.</p>

<h2>Significance</h2>
<p>For a small, landlocked, mountainous country, air connectivity is essential. Druk Air serves as Bhutan's primary link to the outside world, carrying tourists, business travelers, and Bhutanese citizens. The airline's distinctive red-and-yellow livery featuring the thunder dragon has become an iconic symbol of Bhutan.</p>`,
    status: 'published',
  },
  {
    slug: 'bhutan-airlines',
    title: 'Bhutan Airlines',
    category: 'society',
    summary:
      'Bhutan Airlines (Tashi Air) is Bhutan\'s first private airline, established in 2011 and commencing operations in 2013. It operates alongside national carrier Druk Air, providing competition and additional connectivity from Paro International Airport.',
    content_md: `<h2>Overview</h2>
<p>Bhutan Airlines Private Limited, operating as Bhutan Airlines and also known as Tashi Air, is Bhutan's first and only private airline. The airline was founded in 2011 by the Tashi Group of Companies, one of Bhutan's largest private conglomerates, and began commercial operations in 2013. Its establishment ended Druk Air's three-decade monopoly on air service to and from Bhutan.</p>

<h2>Operations</h2>
<p>Like Druk Air, Bhutan Airlines operates from Paro International Airport and faces the same operational challenges posed by the airport's mountain-valley location. The airline operates a small fleet of Airbus A319 aircraft.</p>

<h3>Destinations</h3>
<p>Bhutan Airlines serves routes including:</p>
<ul>
<li>Bangkok (Thailand)</li>
<li>Delhi, Kolkata, Guwahati (India)</li>
<li>Kathmandu (Nepal)</li>
</ul>

<h2>The Tashi Group</h2>
<p>Bhutan Airlines is part of the Tashi Group, founded by Dasho Ugen Dorji, which is one of Bhutan's most prominent business groups. The conglomerate has interests in hospitality, aviation, banking, media, and manufacturing.</p>

<h2>Competition and Impact</h2>
<p>The introduction of Bhutan Airlines brought competition to Bhutan's aviation market for the first time. This has provided travelers with more flight options and has contributed to the growth of Bhutan's tourism sector by increasing available seat capacity on popular routes.</p>`,
    status: 'published',
  },
  {
    slug: 'paro-international-airport',
    title: 'Paro International Airport',
    category: 'places',
    summary:
      'Paro International Airport is Bhutan\'s only international airport and one of the most challenging airports in the world. Situated in a deep valley at 2,236 meters elevation and surrounded by peaks over 5,000 meters, it requires specially certified pilots to operate.',
    content_md: `<h2>Overview</h2>
<p>Paro International Airport (IATA: PBH, ICAO: VQPR) is the sole international airport of the Kingdom of Bhutan, located in the Paro Valley approximately 6 kilometers from the town of Paro. It is widely regarded as one of the most difficult airports in the world to operate, due to its location in a deep valley surrounded by Himalayan peaks reaching over 5,500 meters (18,000 feet).</p>

<h2>Geography and Challenges</h2>
<p>The airport sits at an elevation of 2,236 meters (7,332 feet) above sea level. The runway, measuring 2,265 meters (7,431 feet), is flanked by mountains on all sides, requiring pilots to navigate a series of steep turns during approach and departure. Key operational constraints include:</p>
<ul>
<li><strong>Visual flight rules (VFR) only:</strong> Flights can only operate in clear weather with visual reference to terrain — no instrument approaches are possible</li>
<li><strong>Daylight operations only:</strong> No night flights due to the lack of instrument lighting systems suitable for the terrain</li>
<li><strong>Wind limitations:</strong> The valley's complex wind patterns can force flight cancellations</li>
<li><strong>Pilot certification:</strong> Only a small number of pilots worldwide are certified to fly into Paro, requiring specific training and qualification</li>
</ul>

<h2>History</h2>
<p>The airport was built in 1968 as a small airstrip and expanded over the decades. The runway has been lengthened and upgraded to accommodate modern jet aircraft, and the terminal building has been renovated and expanded to handle increasing passenger volumes.</p>

<h2>Terminal</h2>
<p>The terminal building reflects traditional Bhutanese architecture, with painted wood and ornate decorations that make it one of the most visually distinctive airport terminals in the world. It includes immigration, customs, a small duty-free area, and basic passenger amenities.</p>

<h2>Airlines</h2>
<p>Two airlines serve Paro International Airport:</p>
<ul>
<li><strong>Druk Air</strong> (national carrier) — regional destinations across South and Southeast Asia</li>
<li><strong>Bhutan Airlines</strong> (private) — selected regional routes</li>
</ul>

<h2>Domestic Connectivity</h2>
<p>While Paro is Bhutan's international gateway, domestic airports at Bumthang (Bathpalathang), Yongphula (Trashigang), and Gelephu provide connections to other parts of the country via small aircraft.</p>`,
    status: 'published',
  },
  {
    slug: 'bhutanese-ngultrum',
    title: 'Bhutanese Ngultrum',
    category: 'society',
    summary:
      'The Ngultrum (BTN) is the official currency of Bhutan, pegged at par with the Indian Rupee. Introduced in 1974, it replaced the earlier Tikchung and reflects Bhutan\'s deep economic integration with India.',
    content_md: `<h2>Overview</h2>
<p>The Ngultrum (symbol: Nu.; code: BTN) is the official currency of the Kingdom of Bhutan. It is subdivided into 100 chetrum. The Ngultrum is pegged at par (1:1) with the Indian Rupee (INR), and the Indian Rupee is accepted as legal tender throughout Bhutan — a reflection of the extensive economic ties between the two countries.</p>

<h2>History</h2>
<p>The Ngultrum was introduced in 1974, replacing the Bhutanese Tikchung. Prior to the introduction of a modern currency, Bhutan's economy relied on barter and various historical coinage. The establishment of the Ngultrum was part of the broader modernization of Bhutan's economy under the Third and Fourth Kings.</p>

<h2>The Royal Monetary Authority</h2>
<p>The Royal Monetary Authority of Bhutan (RMA), established in 1982, serves as the country's central bank. It is responsible for issuing the Ngultrum, managing foreign exchange reserves, regulating the banking sector, and overseeing monetary policy.</p>

<h2>Denominations</h2>
<p>Banknotes are issued in denominations of 1, 5, 10, 20, 50, 100, 500, and 1,000 Ngultrum. Coins are issued in smaller denominations. Bhutanese banknotes feature portraits of the Kings of Bhutan and images of important dzongs and landmarks.</p>

<h2>Peg to the Indian Rupee</h2>
<p>The fixed peg to the Indian Rupee reflects the reality that India is Bhutan's overwhelmingly dominant trading partner, and that much of Bhutan's revenue comes from hydropower exports to India priced in Rupees. While the peg provides economic stability and reduces transaction costs with India, it also means Bhutan has limited independent monetary policy.</p>

<h2>Banking</h2>
<p>Bhutan's banking sector includes:</p>
<ul>
<li><strong>Bank of Bhutan (BoB):</strong> The oldest and largest commercial bank, established in 1968</li>
<li><strong>Bhutan National Bank (BNB):</strong> The second major commercial bank</li>
<li><strong>Bhutan Development Bank Limited (BDBL):</strong> Focused on rural and development lending</li>
<li><strong>T Bank:</strong> A newer private bank</li>
<li><strong>Druk PNB:</strong> A joint venture with Punjab National Bank of India</li>
</ul>`,
    status: 'published',
  },
  {
    slug: 'hydropower-in-bhutan',
    title: 'Hydropower in Bhutan',
    category: 'society',
    summary:
      'Hydropower is the single most important sector of Bhutan\'s economy, providing the majority of government revenue and export earnings. Bhutan\'s rivers have an estimated potential of 30,000 MW, of which a fraction has been developed, primarily through partnerships with India.',
    content_md: `<h2>Overview</h2>
<p>Bhutan's abundant water resources, fed by Himalayan glaciers and heavy monsoon rainfall, make hydropower the cornerstone of the national economy. The country's estimated hydropower potential of approximately 30,000 MW is enormous relative to its small population and domestic electricity needs. Hydropower development — primarily through bilateral agreements with India — accounts for a significant share of GDP, government revenue, and export earnings.</p>

<h2>Major Projects</h2>
<h3>Operational</h3>
<ul>
<li><strong>Chhukha Hydropower Plant (336 MW):</strong> Bhutan's first major hydropower project, commissioned in 1986 with Indian assistance. Located on the Wang Chhu river, it marked the beginning of Bhutan's hydropower era and remains a significant generator.</li>
<li><strong>Kurichhu Hydropower Plant (60 MW):</strong> Commissioned in 2001 on the Kurichhu river in eastern Bhutan.</li>
<li><strong>Basochhu Hydropower Plant (64 MW):</strong> A run-of-river project completed with Austrian assistance.</li>
<li><strong>Tala Hydropower Plant (1,020 MW):</strong> Commissioned in 2007, Tala was Bhutan's largest project at the time and dramatically increased the country's generation capacity. Built on the Wang Chhu below Chhukha.</li>
<li><strong>Dagachhu Hydropower Plant (126 MW):</strong> The first public-private partnership in Bhutan's hydropower sector.</li>
<li><strong>Mangdechhu Hydropower Plant (720 MW):</strong> Commissioned in 2019 on the Mangde Chhu in central Bhutan.</li>
</ul>

<h3>Under Construction / Planned</h3>
<ul>
<li><strong>Punatsangchhu-I (1,200 MW) and Punatsangchhu-II (1,020 MW):</strong> Two massive projects on the Punatsangchhu (Sankosh) river that have experienced significant delays and cost overruns due to geological challenges.</li>
<li><strong>Kholongchhu (600 MW):</strong> A joint venture project.</li>
<li>Several smaller projects in various stages of planning and development.</li>
</ul>

<h2>Partnership with India</h2>
<p>India has been the primary partner in Bhutan's hydropower development, providing financing, technical expertise, and a guaranteed market for electricity. Under bilateral agreements, India funds hydropower projects through a mix of grants and loans, and purchases the surplus electricity at agreed rates.</p>
<p>This arrangement is mutually beneficial: Bhutan receives revenue and infrastructure development, while India obtains clean energy for its northeastern states. However, it also creates deep economic dependency on India and has raised questions about the terms of the agreements and whether Bhutan receives fair value for its resources.</p>

<h2>Revenue and Economic Impact</h2>
<p>Hydropower revenue finances a large portion of Bhutan's government budget, enabling spending on education, healthcare, and infrastructure that would otherwise be impossible for a country of Bhutan's size and development level. The sector also provides employment and drives construction activity.</p>

<h2>Environmental Considerations</h2>
<p>While hydropower is a renewable energy source, large dam projects in Bhutan have environmental implications:</p>
<ul>
<li>River ecosystem disruption and impacts on downstream water flows</li>
<li>Geological risks (the Himalayan region is seismically active)</li>
<li>Displacement of local communities for reservoir construction</li>
<li>Climate change impacts on glacier-fed river systems that could affect long-term generation capacity</li>
</ul>
<p>Bhutan has generally pursued run-of-river projects over large reservoir dams, reducing some environmental impacts, but the scale of planned development raises ongoing concerns.</p>`,
    status: 'published',
  },
  {
    slug: 'tourism-in-bhutan',
    title: 'Tourism in Bhutan',
    category: 'society',
    summary:
      'Bhutan follows a "high value, low impact" tourism policy, requiring international visitors to pay a Sustainable Development Fee. Tourism is a significant economic sector centered on cultural heritage, Buddhist monasteries, and Himalayan landscapes.',
    content_md: `<h2>Overview</h2>
<p>Tourism in Bhutan operates under a distinctive "high value, low impact" policy designed to protect the country's cultural heritage and natural environment while generating revenue for sustainable development. Since opening to tourism in 1974, Bhutan has carefully controlled visitor numbers and activities, making it one of the most exclusive tourist destinations in the world.</p>

<h2>History</h2>
<p>Bhutan was closed to foreign visitors until 1974, when a small number of guests were invited to the coronation of the Fourth King. Tourism was formally opened that year, with just 287 visitors. Growth was gradual and controlled, reaching approximately 300,000 international arrivals (including regional tourists from India, Bangladesh, and the Maldives) before the COVID-19 pandemic.</p>

<h2>The Sustainable Development Fee</h2>
<p>Bhutan's tourism policy has undergone several revisions:</p>
<ul>
<li><strong>Original minimum daily tariff:</strong> For decades, tourists were required to spend a minimum of $200–250 per day, which covered accommodation, meals, transportation, guides, and a royalty component</li>
<li><strong>2022 reform:</strong> The system was restructured to a Sustainable Development Fee (SDF) of $200 per person per night (later reduced to $100), paid directly to the government. Tourists now arrange accommodation and services independently or through operators, providing more flexibility</li>
</ul>
<p>Revenue from the SDF funds free healthcare, free education, poverty alleviation, and environmental conservation.</p>

<h3>Regional Tourists</h3>
<p>Citizens of India, Bangladesh, and the Maldives are exempt from the SDF and can visit Bhutan with fewer restrictions, though they must obtain permits for certain areas.</p>

<h2>Major Attractions</h2>
<ul>
<li><strong>Paro Taktsang (Tiger's Nest):</strong> Bhutan's most iconic monastery</li>
<li><strong>Punakha Dzong:</strong> One of the most magnificent dzongs</li>
<li><strong>Thimphu:</strong> The capital city with museums, the giant Buddha statue, and Tashichho Dzong</li>
<li><strong>Bumthang Valley:</strong> The spiritual heartland with ancient temples</li>
<li><strong>Haa Valley:</strong> A secluded valley with pristine landscapes</li>
<li><strong>Festivals (Tshechus):</strong> Colorful religious festivals held throughout the year at dzongs across the country</li>
<li><strong>Trekking:</strong> Including the famous Snowman Trek, considered one of the world's most difficult treks</li>
</ul>

<h2>Tourism Infrastructure</h2>
<p>Bhutan has a growing hospitality sector ranging from luxury resorts (including properties by international brands like Aman, Six Senses, and Como) to budget guesthouses. The Tourism Council of Bhutan (TCB) oversees the sector and certifies guides and operators.</p>

<h2>Challenges</h2>
<ul>
<li>Balancing revenue generation with cultural and environmental protection</li>
<li>Seasonal concentration of visitors (spring and autumn)</li>
<li>Limited infrastructure in eastern Bhutan, which receives few tourists</li>
<li>Post-pandemic recovery and the impact of the revised SDF on visitor numbers</li>
<li>The tension between controlling tourism and the economic need for growth</li>
</ul>`,
    status: 'published',
  },
  {
    slug: 'dzongs-of-bhutan',
    title: 'Dzongs of Bhutan',
    category: 'places',
    summary:
      'Dzongs are massive fortress-monasteries that serve as the administrative and religious centers of Bhutan\'s 20 districts. Combining government offices, temples, and monastic quarters, they are Bhutan\'s most distinctive architectural heritage.',
    content_md: `<h2>Overview</h2>
<p>Dzongs (རྫོང) are the most iconic architectural form of Bhutan — massive fortified structures that uniquely combine administrative government offices with Buddhist monastic quarters. Every one of Bhutan's 20 dzongkhags (districts) is administered from a dzong, making them the literal seats of both secular and religious authority across the country.</p>

<h2>History</h2>
<p>The dzong-building tradition was systematized by Zhabdrung Ngawang Namgyal in the 17th century as part of his unification of Bhutan. The Zhabdrung established the "dual system" of governance in which a dzong's two wings housed the district's governmental administration and its monastic community, respectively. While defensive fortifications existed in Bhutan before the Zhabdrung, he transformed the dzong into an institution — a combined fortress, monastery, and administrative center that remains the basis of Bhutanese governance today.</p>

<h2>Architecture</h2>
<p>Bhutanese dzongs share common architectural features:</p>
<ul>
<li><strong>Massive walls:</strong> Thick, whitewashed walls that taper inward, built of rammed earth and stone without the use of nails or architectural plans</li>
<li><strong>Central tower (utse):</strong> A tall tower that typically divides the administrative and monastic courtyards</li>
<li><strong>Courtyards (docheys):</strong> Open spaces used for festivals, ceremonies, and daily activities</li>
<li><strong>Temples:</strong> Richly decorated Buddhist temples within the monastic wing</li>
<li><strong>Decorative elements:</strong> Elaborate wood carvings, painted window frames, and symbolic ornamentation</li>
<li><strong>Strategic positioning:</strong> Dzongs are typically built at confluences of rivers, on hilltops, or at valley entrances for defensive advantage</li>
</ul>

<h2>Notable Dzongs</h2>
<ul>
<li><strong>Punakha Dzong:</strong> The most magnificent, at the confluence of two rivers</li>
<li><strong>Tashichho Dzong (Thimphu):</strong> The seat of national government</li>
<li><strong>Rinpung Dzong (Paro):</strong> A large and well-preserved dzong overlooking the Paro Valley</li>
<li><strong>Trongsa Dzong:</strong> Strategically positioned on a ridge above the Mangde Chhu gorge; historically the most powerful dzong</li>
<li><strong>Wangdue Phodrang Dzong:</strong> Suffered a devastating fire in 2012; currently being rebuilt</li>
<li><strong>Lhuentse Dzong:</strong> Perched on a hilltop in one of the most remote districts</li>
<li><strong>Jakar Dzong (Bumthang):</strong> Known as the "Castle of the White Bird"</li>
</ul>

<h2>Living Institutions</h2>
<p>Unlike historical fortresses in many countries, Bhutan's dzongs remain fully functional. Government officials work in the administrative wing during the day, monks conduct prayers and studies in the monastic wing, and annual festivals (<em>tshechus</em>) bring communities together in the courtyards. This continuity of purpose — spanning centuries — makes Bhutan's dzongs unique among the world's architectural heritage.</p>

<h2>Conservation</h2>
<p>Dzongs face ongoing conservation challenges, including fire (the most common threat), earthquake damage, and the effects of weather on traditional building materials. Restoration efforts use traditional techniques and materials, maintaining architectural authenticity. The government has established guidelines for dzong maintenance and restoration.</p>`,
    status: 'published',
  },
  {
    slug: 'thimphu',
    title: 'Thimphu',
    category: 'places',
    summary:
      'Thimphu is the capital and largest city of Bhutan, with a population of approximately 115,000. It is one of the few national capitals in the world without traffic lights, and serves as the political, economic, and cultural center of the country.',
    content_md: `<h2>Overview</h2>
<p>Thimphu (ཐིམ་ཕུ) is the capital city of Bhutan, located in the western part of the country in a valley along the Wang Chhu river at an altitude of approximately 2,320 meters (7,610 feet). With a population of around 115,000, it is Bhutan's largest urban center and the seat of government, commerce, and cultural life. Thimphu became the permanent capital in 1961, when the Third King moved the government from Punakha.</p>

<h2>Landmarks</h2>
<ul>
<li><strong>Tashichho Dzong:</strong> The seat of government and the central monastic body's summer residence</li>
<li><strong>Buddha Dordenma:</strong> A massive gilded bronze Buddha statue (51.5 meters tall) overlooking the city from a hilltop</li>
<li><strong>National Memorial Chorten:</strong> A stupa built in 1974 in memory of the Third King, a popular worship site</li>
<li><strong>Changlimithang Stadium:</strong> The national stadium, used for archery (the national sport) and football</li>
<li><strong>Folk Heritage Museum:</strong> Showcasing traditional Bhutanese life</li>
<li><strong>National Library and National Museum:</strong> Preserving Bhutanese texts, art, and artifacts</li>
<li><strong>Centenary Farmers' Market:</strong> A weekend market along the Wang Chhu where farmers from surrounding areas sell produce</li>
</ul>

<h2>Urbanization</h2>
<p>Thimphu has experienced rapid growth as rural Bhutanese migrate to the capital for education and employment. This urbanization has brought challenges:</p>
<ul>
<li>Housing shortages and rising real estate costs</li>
<li>Traffic congestion (despite the famous absence of traffic lights — a policeman still directs traffic at the main intersection)</li>
<li>Strain on water supply and waste management</li>
<li>Loss of agricultural land to construction</li>
<li>Youth unemployment and social challenges</li>
</ul>
<p>The Thimphu Structure Plan guides urban development, attempting to balance growth with the preservation of Bhutanese architectural character and green spaces.</p>

<h2>Culture and Daily Life</h2>
<p>Thimphu is a blend of tradition and modernity. Traditional dress (<em>gho</em> and <em>kira</em>) is required in government offices and schools, and dzong architecture is mandated for buildings. At the same time, cafes, restaurants, karaoke bars, and shops selling international goods reflect growing modernization and global influence, particularly among the youth.</p>

<h2>Climate</h2>
<p>Thimphu experiences a temperate climate with warm, monsoon-influenced summers (June–September) and cold, dry winters (December–February). Snowfall occurs occasionally in winter. Spring (March–May) and autumn (October–November) are the most pleasant seasons and peak tourist periods.</p>`,
    status: 'published',
  },
]

async function seed() {
  // Get existing editorial contributor
  const { data: contributor } = await supabase
    .from('contributors')
    .select('id')
    .eq('display_name', 'BhutanWiki Editorial')
    .single()

  if (!contributor) {
    console.error('BhutanWiki Editorial contributor not found. Run seed-articles.ts first.')
    return
  }

  console.log(`Using contributor: ${contributor.id}`)

  let created = 0
  let skipped = 0

  for (const article of articles) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', article.slug)
      .single()

    if (existing) {
      console.log(`  Skipped (exists): ${article.title}`)
      skipped++
      continue
    }

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
      console.error(`  Failed: ${article.title} — ${error.message}`)
      continue
    }

    await supabase.from('article_versions').insert({
      article_id: data.id,
      version_number: 1,
      content_md: article.content_md,
      edit_summary: 'Initial creation',
      edited_by: contributor.id,
    })

    console.log(`  Created: ${article.title}`)
    created++
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`)
}

seed()
