export interface SeedDzongkhag {
  name: string
  name_dz: string
  slug: string
  area_km2: number
  population: number
  capital: string
  gewogs: { name: string; slug: string }[]
}

export const dzongkhags: SeedDzongkhag[] = [
  {
    name: 'Bumthang', name_dz: 'བུམ་ཐང་', slug: 'bumthang', area_km2: 2707, population: 17820, capital: 'Jakar',
    gewogs: [
      { name: 'Chhoekhor', slug: 'chhoekhor' },
      { name: 'Chhume', slug: 'chhume' },
      { name: 'Tang', slug: 'tang' },
      { name: 'Ura', slug: 'ura' },
    ]
  },
  {
    name: 'Chhukha', name_dz: 'ཆུ་ཁ་', slug: 'chhukha', area_km2: 1879, population: 74387, capital: 'Chhukha',
    gewogs: [
      { name: 'Bongo', slug: 'bongo' },
      { name: 'Chapcha', slug: 'chapcha' },
      { name: 'Darla', slug: 'darla' },
      { name: 'Dungna', slug: 'dungna' },
      { name: 'Geling', slug: 'geling' },
      { name: 'Getana', slug: 'getana' },
      { name: 'Lokchina', slug: 'lokchina' },
      { name: 'Metakha', slug: 'metakha' },
      { name: 'Phuentsholing', slug: 'phuentsholing' },
      { name: 'Sampheling', slug: 'sampheling' },
    ]
  },
  {
    name: 'Dagana', name_dz: 'དར་དཀར་ན་', slug: 'dagana', area_km2: 1723, population: 27722, capital: 'Dagana',
    gewogs: [
      { name: 'Dorona', slug: 'dorona' },
      { name: 'Gesarling', slug: 'gesarling' },
      { name: 'Goshi', slug: 'goshi' },
      { name: 'Kana', slug: 'kana' },
      { name: 'Khebisa', slug: 'khebisa' },
      { name: 'Lajab', slug: 'lajab' },
      { name: 'Nichula', slug: 'nichula' },
      { name: 'Tsangkha', slug: 'tsangkha' },
      { name: 'Tsendagang', slug: 'tsendagang' },
      { name: 'Tsheza', slug: 'tsheza' },
    ]
  },
  {
    name: 'Gasa', name_dz: 'མགར་ས་', slug: 'gasa', area_km2: 3117, population: 3952, capital: 'Gasa',
    gewogs: [
      { name: 'Goenkhamey', slug: 'goenkhamey' },
      { name: 'Goenkhatoe', slug: 'goenkhatoe' },
      { name: 'Laya', slug: 'laya' },
      { name: 'Lunana', slug: 'lunana' },
    ]
  },
  {
    name: 'Haa', name_dz: 'ཧཱ་', slug: 'haa', area_km2: 1706, population: 13655, capital: 'Haa',
    gewogs: [
      { name: 'Bji', slug: 'bji' },
      { name: 'Gakiling', slug: 'gakiling' },
      { name: 'Isuuna', slug: 'isuuna' },
      { name: 'Kar Tshog', slug: 'kar-tshog' },
      { name: 'Samar', slug: 'samar' },
      { name: 'Sangbay', slug: 'sangbay' },
    ]
  },
  {
    name: 'Lhuentse', name_dz: 'ལྷུན་རྩེ་', slug: 'lhuentse', area_km2: 2847, population: 15395, capital: 'Lhuentse',
    gewogs: [
      { name: 'Gangzur', slug: 'gangzur' },
      { name: 'Jarey', slug: 'jarey' },
      { name: 'Khoma', slug: 'khoma' },
      { name: 'Kurtoe', slug: 'kurtoe' },
      { name: 'Menbi', slug: 'menbi' },
      { name: 'Metsho', slug: 'metsho' },
      { name: 'Minjay', slug: 'minjay' },
      { name: 'Tsenkhar', slug: 'tsenkhar' },
    ]
  },
  {
    name: 'Mongar', name_dz: 'མོང་སྒར་', slug: 'mongar', area_km2: 1954, population: 37069, capital: 'Mongar',
    gewogs: [
      { name: 'Balam', slug: 'balam' },
      { name: 'Chaskhar', slug: 'chaskhar' },
      { name: 'Chhaling', slug: 'chhaling' },
      { name: 'Drepung', slug: 'drepung' },
      { name: 'Gongdue', slug: 'gongdue' },
      { name: 'Jurmey', slug: 'jurmey' },
      { name: 'Kengkhar', slug: 'kengkhar' },
      { name: 'Mongar', slug: 'mongar' },
      { name: 'Narang', slug: 'narang' },
      { name: 'Ngatshang', slug: 'ngatshang' },
      { name: 'Saleng', slug: 'saleng' },
      { name: 'Sherimuhng', slug: 'sherimuhng' },
      { name: 'Silambi', slug: 'silambi' },
      { name: 'Thangrong', slug: 'thangrong' },
      { name: 'Tsakaling', slug: 'tsakaling' },
      { name: 'Tsamang', slug: 'tsamang' },
    ]
  },
  {
    name: 'Paro', name_dz: 'སྤ་རོ་', slug: 'paro', area_km2: 1293, population: 46316, capital: 'Paro',
    gewogs: [
      { name: 'Doga', slug: 'doga' },
      { name: 'Dopshari', slug: 'dopshari' },
      { name: 'Doteng', slug: 'doteng' },
      { name: 'Hungrel', slug: 'hungrel' },
      { name: 'Lamgong', slug: 'lamgong' },
      { name: 'Lungnyi', slug: 'lungnyi' },
      { name: 'Naja', slug: 'naja' },
      { name: 'Shaba', slug: 'shaba' },
      { name: 'Tsento', slug: 'tsento' },
      { name: 'Wangchang', slug: 'wangchang' },
    ]
  },
  {
    name: 'Pema Gatshel', name_dz: 'པདྨ་དགའ་ཚལ་', slug: 'pema-gatshel', area_km2: 1024, population: 24646, capital: 'Pema Gatshel',
    gewogs: [
      { name: 'Chhimoong', slug: 'chhimoong' },
      { name: 'Choekhor', slug: 'choekhor' },
      { name: 'Dechheling', slug: 'dechheling' },
      { name: 'Dungmin', slug: 'dungmin' },
      { name: 'Khar', slug: 'khar' },
      { name: 'Nanong', slug: 'nanong' },
      { name: 'Norbugang', slug: 'norbugang' },
      { name: 'Shumar', slug: 'shumar' },
      { name: 'Yurung', slug: 'yurung' },
      { name: 'Zobel', slug: 'zobel' },
    ]
  },
  {
    name: 'Punakha', name_dz: 'སྤུ་ན་ཁ་', slug: 'punakha', area_km2: 1110, population: 27658, capital: 'Punakha',
    gewogs: [
      { name: 'Barp', slug: 'barp' },
      { name: 'Chhubu', slug: 'chhubu' },
      { name: 'Guma', slug: 'guma' },
      { name: 'Goenshari', slug: 'goenshari' },
      { name: 'Kabisa', slug: 'kabisa' },
      { name: 'Lingmukha', slug: 'lingmukha' },
      { name: 'Shelnga-Bejhi', slug: 'shelnga-bejhi' },
      { name: 'Talo', slug: 'talo' },
      { name: 'Teowang', slug: 'teowang' },
      { name: 'Toepisa', slug: 'toepisa' },
    ]
  },
  {
    name: 'Samdrup Jongkhar', name_dz: 'བསམ་གྲུབ་ལྗོང་མཁར་', slug: 'samdrup-jongkhar', area_km2: 1878, population: 39918, capital: 'Samdrup Jongkhar',
    gewogs: [
      { name: 'Dewathang', slug: 'dewathang' },
      { name: 'Gomdar', slug: 'gomdar' },
      { name: 'Langchenphu', slug: 'langchenphu' },
      { name: 'Lauri', slug: 'lauri' },
      { name: 'Martshala', slug: 'martshala' },
      { name: 'Orong', slug: 'orong' },
      { name: 'Pemathang', slug: 'pemathang' },
      { name: 'Phuntshothang', slug: 'phuntshothang' },
      { name: 'Samrang', slug: 'samrang' },
      { name: 'Serthi', slug: 'serthi' },
      { name: 'Wangphu', slug: 'wangphu' },
    ]
  },
  {
    name: 'Samtse', name_dz: 'བསམ་རྩེ་', slug: 'samtse', area_km2: 1305, population: 62590, capital: 'Samtse',
    gewogs: [
      { name: 'Bara', slug: 'bara' },
      { name: 'Chengmari', slug: 'chengmari' },
      { name: 'Denchukha', slug: 'denchukha' },
      { name: 'Dorokha', slug: 'dorokha' },
      { name: 'Dophuchen', slug: 'dophuchen' },
      { name: 'Dumtoe', slug: 'dumtoe' },
      { name: 'Norbugang', slug: 'norbugang' },
      { name: 'Norgaygang', slug: 'norgaygang' },
      { name: 'Pemaling', slug: 'pemaling' },
      { name: 'Phuentshogpelri', slug: 'phuentshogpelri' },
      { name: 'Samtse', slug: 'samtse' },
      { name: 'Sangachchoeling', slug: 'sangachchoeling' },
      { name: 'Tading', slug: 'tading' },
      { name: 'Tendruk', slug: 'tendruk' },
      { name: 'Ugentse', slug: 'ugentse' },
    ]
  },
  {
    name: 'Sarpang', name_dz: 'གསར་སྤང་', slug: 'sarpang', area_km2: 1655, population: 41559, capital: 'Sarpang',
    gewogs: [
      { name: 'Bhur', slug: 'bhur' },
      { name: 'Chhuzagang', slug: 'chhuzagang' },
      { name: 'Dekiling', slug: 'dekiling' },
      { name: 'Gelephu', slug: 'gelephu' },
      { name: 'Jigmechoeling', slug: 'jigmechoeling' },
      { name: 'Samtenling', slug: 'samtenling' },
      { name: 'Senggye', slug: 'senggye' },
      { name: 'Shompangkha', slug: 'shompangkha' },
      { name: 'Tareythang', slug: 'tareythang' },
      { name: 'Umling', slug: 'umling' },
    ]
  },
  {
    name: 'Thimphu', name_dz: 'ཐིམ་ཕུ་', slug: 'thimphu', area_km2: 1800, population: 138736, capital: 'Thimphu',
    gewogs: [
      { name: 'Chang', slug: 'chang' },
      { name: 'Dagala', slug: 'dagala' },
      { name: 'Genye', slug: 'genye' },
      { name: 'Kawang', slug: 'kawang' },
      { name: 'Lingzhi', slug: 'lingzhi' },
      { name: 'Mewang', slug: 'mewang' },
      { name: 'Naro', slug: 'naro' },
      { name: 'Soe', slug: 'soe' },
    ]
  },
  {
    name: 'Trashigang', name_dz: 'བཀྲ་ཤིས་སྒང་', slug: 'trashigang', area_km2: 2203, population: 51134, capital: 'Trashigang',
    gewogs: [
      { name: 'Bartsham', slug: 'bartsham' },
      { name: 'Bidung', slug: 'bidung' },
      { name: 'Kanglung', slug: 'kanglung' },
      { name: 'Kangpara', slug: 'kangpara' },
      { name: 'Khaling', slug: 'khaling' },
      { name: 'Lumang', slug: 'lumang' },
      { name: 'Merak', slug: 'merak' },
      { name: 'Phongmey', slug: 'phongmey' },
      { name: 'Radhi', slug: 'radhi' },
      { name: 'Sakteng', slug: 'sakteng' },
      { name: 'Samkhar', slug: 'samkhar' },
      { name: 'Shongphu', slug: 'shongphu' },
      { name: 'Thrimshing', slug: 'thrimshing' },
      { name: 'Uzorong', slug: 'uzorong' },
      { name: 'Yangnyer', slug: 'yangnyer' },
    ]
  },
  {
    name: 'Trashi Yangtse', name_dz: 'བཀྲ་ཤིས་གཡང་རྩེ་', slug: 'trashi-yangtse', area_km2: 1439, population: 17740, capital: 'Trashi Yangtse',
    gewogs: [
      { name: 'Boomdeling', slug: 'boomdeling' },
      { name: 'Jamkhar', slug: 'jamkhar' },
      { name: 'Khamdang', slug: 'khamdang' },
      { name: 'Ramjar', slug: 'ramjar' },
      { name: 'Toetsho', slug: 'toetsho' },
      { name: 'Tongzhang', slug: 'tongzhang' },
      { name: 'Yangtse', slug: 'yangtse' },
      { name: 'Yallang', slug: 'yallang' },
    ]
  },
  {
    name: 'Trongsa', name_dz: 'ཀྲོང་གསར་', slug: 'trongsa', area_km2: 1807, population: 15859, capital: 'Trongsa',
    gewogs: [
      { name: 'Dragteng', slug: 'dragteng' },
      { name: 'Korphu', slug: 'korphu' },
      { name: 'Langthel', slug: 'langthel' },
      { name: 'Nubi', slug: 'nubi' },
      { name: 'Tangsibji', slug: 'tangsibji' },
    ]
  },
  {
    name: 'Tsirang', name_dz: 'རྩི་རང་', slug: 'tsirang', area_km2: 639, population: 21537, capital: 'Damphu',
    gewogs: [
      { name: 'Barshong', slug: 'barshong' },
      { name: 'Dunglagang', slug: 'dunglagang' },
      { name: 'Goseling', slug: 'goseling' },
      { name: 'Kikhorthang', slug: 'kikhorthang' },
      { name: 'Mendrelgang', slug: 'mendrelgang' },
      { name: 'Patshaling', slug: 'patshaling' },
      { name: 'Phuentenchhu', slug: 'phuentenchhu' },
      { name: 'Rangthangling', slug: 'rangthangling' },
      { name: 'Semjong', slug: 'semjong' },
      { name: 'Sergithang', slug: 'sergithang' },
      { name: 'Tsirangtoe', slug: 'tsirangtoe' },
      { name: 'Tsholingkhar', slug: 'tsholingkhar' },
    ]
  },
  {
    name: 'Wangdue Phodrang', name_dz: 'དབང་འདུས་ཕོ་བྲང་', slug: 'wangdue-phodrang', area_km2: 4308, population: 42186, capital: 'Bajo',
    gewogs: [
      { name: 'Athang', slug: 'athang' },
      { name: 'Bjena', slug: 'bjena' },
      { name: 'Daga', slug: 'daga' },
      { name: 'Dangchhu', slug: 'dangchhu' },
      { name: 'Gangtey', slug: 'gangtey' },
      { name: 'Gasetsho Gom', slug: 'gasetsho-gom' },
      { name: 'Gasetsho Wom', slug: 'gasetsho-wom' },
      { name: 'Kazhi', slug: 'kazhi' },
      { name: 'Nahi', slug: 'nahi' },
      { name: 'Nyishog', slug: 'nyishog' },
      { name: 'Phangyul', slug: 'phangyul' },
      { name: 'Phobji', slug: 'phobji' },
      { name: 'Ruepisa', slug: 'ruepisa' },
      { name: 'Sephu', slug: 'sephu' },
      { name: 'Thedtsho', slug: 'thedtsho' },
    ]
  },
  {
    name: 'Zhemgang', name_dz: 'གཞལམ་སྒང་', slug: 'zhemgang', area_km2: 2416, population: 17763, capital: 'Zhemgang',
    gewogs: [
      { name: 'Bardo', slug: 'bardo' },
      { name: 'Bjoka', slug: 'bjoka' },
      { name: 'Goshing', slug: 'goshing' },
      { name: 'Nangkor', slug: 'nangkor' },
      { name: 'Ngangla', slug: 'ngangla' },
      { name: 'Phangkhar', slug: 'phangkhar' },
      { name: 'Shingkhar', slug: 'shingkhar' },
      { name: 'Trong', slug: 'trong' },
    ]
  },
]
