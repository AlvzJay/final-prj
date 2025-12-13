import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../housing';
import { HousingLocationInfo } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

interface RoseInfo {
  origin: string;
  description: string;
  uses: string[];
  whereToFind: string;
  history: string;
  careInfo?: {
    location: string;
    temperature: string;
    soil: string;
    watering: string;
    sunlight: string;
    humidity: string;
  };
}

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  housingService = inject(HousingService);
  cartService = inject(CartService);
  housingLocation: HousingLocationInfo | undefined;
  addedToCart = false;

  private roseInfoMap: { [key: string]: RoseInfo } = {
    'Hybrid Tea Rose': {
      origin: 'France, 1867',
      description: 'Hybrid Tea Roses are the most popular type of rose, known for their large, well-formed blooms with a high center. They typically produce one flower per stem and have a strong, classic rose fragrance. The flowers come in a wide range of colors and are perfect for cutting.',
      uses: ['Cut flowers', 'Garden display', 'Floral arrangements', 'Perfume production', 'Wedding bouquets'],
      whereToFind: 'Widely available in nurseries, garden centers, and online retailers worldwide. Common in temperate climates across North America, Europe, and Asia.',
      history: 'The first Hybrid Tea Rose was created in 1867 by French breeder Jean-Baptiste Guillot when he crossed a Tea Rose with a Hybrid Perpetual. The variety was named "La France" and marked the beginning of modern rose breeding. This breakthrough revolutionized rose cultivation, leading to thousands of new varieties with improved disease resistance, color range, and bloom quality.',
      careInfo: {
        location: 'Outdoor garden beds, containers on patios or balconies. Best in full sun areas with good air circulation.',
        temperature: 'Ideal: 65-75°F (18-24°C). Can tolerate 20-90°F (-7 to 32°C) with protection.',
        soil: 'Well-draining, loamy soil with pH 6.0-6.5. Mix compost or organic matter for best results.',
        watering: 'Water deeply 2-3 times per week. Keep soil moist but not waterlogged. Water at base, avoid wetting leaves.',
        sunlight: 'Full sun (6-8 hours daily). Morning sun is ideal to dry dew and prevent disease.',
        humidity: 'Moderate humidity (40-60%). Good air circulation helps prevent fungal diseases.'
      }
    },
    'Grandiflora Rose': {
      origin: 'United States, 1954',
      description: 'Grandiflora Roses combine the best traits of Hybrid Tea and Floribunda roses. They produce large, elegant blooms similar to Hybrid Teas but in clusters like Floribundas. These roses are tall, vigorous plants that bloom continuously throughout the growing season.',
      uses: ['Garden borders', 'Hedging', 'Cut flowers', 'Landscape design', 'Public gardens'],
      whereToFind: 'Available in most garden centers and nurseries, especially in the United States. Also found in botanical gardens and public parks.',
      history: 'Grandiflora Roses were first introduced in 1954 by American rose breeder Walter Lammerts with the variety "Queen Elizabeth". This rose was created by crossing a Hybrid Tea with a Floribunda, combining the large blooms of the former with the cluster-flowering habit of the latter. The name "Grandiflora" means "large-flowered" in Latin, and this class has become popular for its versatility and continuous blooming.'
    },
    'Floribunda Rose': {
      origin: 'Denmark, 1924',
      description: 'Floribunda Roses are known for their profuse clusters of blooms that appear continuously throughout the season. They are hardy, disease-resistant, and produce flowers in a wide variety of colors. The plants are typically compact and bushy, making them excellent for mass plantings.',
      uses: ['Mass plantings', 'Garden borders', 'Container gardening', 'Landscape design', 'Cut flower gardens'],
      whereToFind: 'Extremely common in nurseries and garden centers worldwide. Popular in public parks, commercial landscapes, and home gardens across temperate regions.',
      history: 'Floribunda Roses were developed in the 1920s by Danish breeder Svend Poulsen, who crossed Polyantha roses with Hybrid Teas. The first recognized Floribunda was "Rödhätte" (Red Riding Hood) in 1924. The term "Floribunda" means "many-flowered" and these roses quickly gained popularity for their hardiness, continuous blooming, and low maintenance requirements.'
    },
    'Climbing Rose': {
      origin: 'Various regions, ancient times',
      description: 'Climbing Roses are vigorous, long-caned roses that can reach heights of 8-20 feet. They produce large clusters of flowers and are perfect for covering walls, trellises, and arbors. Unlike true vines, they need support to climb and are trained rather than naturally clinging.',
      uses: ['Wall coverings', 'Trellises and arbors', 'Garden structures', 'Privacy screens', 'Architectural features'],
      whereToFind: 'Available in nurseries specializing in roses. Common in gardens throughout Europe, North America, and Asia. Often seen in historic gardens and estates.',
      history: 'Climbing roses have been cultivated for centuries, with some varieties dating back to ancient China and Persia. Many modern climbers are sports (mutations) of bush roses. The famous "New Dawn" climbing rose, introduced in 1930, was one of the first to be patented. Climbing roses have been used in gardens since medieval times, adorning castle walls and monastery gardens throughout Europe.'
    },
    'Miniature Rose': {
      origin: 'China, introduced to Europe in 1810',
      description: 'Miniature Roses are compact plants, typically growing 6-24 inches tall, with proportionally small leaves and flowers. Despite their size, they produce full-sized rose blooms in miniature form. They are perfect for containers, borders, and small gardens.',
      uses: ['Container gardening', 'Indoor houseplants', 'Garden borders', 'Rock gardens', 'Gift plants'],
      whereToFind: 'Widely available in garden centers, especially as potted plants. Common in indoor plant sections and specialty rose nurseries. Popular as gift plants.',
      history: 'Miniature Roses originated from small wild roses found in China, particularly Rosa chinensis minima. They were first introduced to Europe in 1810 but didn\'t gain popularity until the 1930s when American breeder Ralph Moore began serious breeding programs. Modern miniatures combine the charm of small size with the disease resistance and color range of larger roses, making them ideal for modern gardening.'
    },
    'Shrub Rose': {
      origin: 'Various, modern breeding since 1960s',
      description: 'Shrub Roses are a diverse group of hardy, low-maintenance roses that form bushy, rounded plants. They are known for their disease resistance, cold hardiness, and continuous blooming. Flowers can be single or double, and plants range from 3-10 feet in height.',
      uses: ['Hedging', 'Mass plantings', 'Wildlife gardens', 'Low-maintenance landscapes', 'Naturalistic gardens'],
      whereToFind: 'Common in nurseries, especially those specializing in hardy plants. Popular in public gardens, parks, and residential landscapes throughout temperate climates.',
      history: 'The term "Shrub Rose" became popular in the 1960s with the introduction of English Roses by David Austin, who crossed old garden roses with modern varieties. However, shrub roses have existed for centuries, with many being species roses or their direct descendants. Modern shrub roses emphasize natural beauty, disease resistance, and minimal care, making them ideal for sustainable gardening.'
    },
    'English Rose': {
      origin: 'United Kingdom, 1961',
      description: 'English Roses, also known as David Austin Roses, combine the charm and fragrance of old garden roses with the repeat-flowering and color range of modern roses. They feature full, cupped blooms with a strong, delightful fragrance and come in a wide range of colors.',
      uses: ['Garden borders', 'Cut flowers', 'Fragrant gardens', 'Formal gardens', 'Cottage gardens'],
      whereToFind: 'Available through David Austin Roses and authorized dealers worldwide. Popular in English-style gardens, botanical gardens, and specialty rose nurseries.',
      history: 'English Roses were developed by British rose breeder David Austin, starting in 1961 with "Constance Spry". Austin\'s goal was to create roses that combined the best qualities of old and new roses. By crossing old garden roses (particularly Gallicas, Damasks, and Bourbons) with modern Hybrid Teas and Floribundas, he created a new class of roses that revolutionized rose gardening. The English Rose has become one of the most beloved rose types worldwide.'
    },
    'Wild Rose': {
      origin: 'Northern Hemisphere, prehistoric times',
      description: 'Wild Roses, also known as species roses, are the original roses found in nature. They typically have single, five-petaled flowers, produce attractive rose hips, and are extremely hardy. Most bloom once per season in spring or early summer.',
      uses: ['Wildlife habitat', 'Hedge rows', 'Natural landscaping', 'Rose hip harvesting', 'Conservation plantings'],
      whereToFind: 'Found naturally in woodlands, meadows, and along roadsides throughout the Northern Hemisphere. Available from native plant nurseries and conservation organizations.',
      history: 'Wild Roses are the ancestors of all cultivated roses, with fossil evidence dating back 35 million years. They have been used by humans for thousands of years for food (rose hips), medicine, and ornamental purposes. Native peoples across Europe, Asia, and North America have long valued wild roses. Many species, such as Rosa canina (Dog Rose) and Rosa rugosa, have been naturalized across continents and continue to thrive in the wild.'
    },
    'Damask Rose': {
      origin: 'Middle East, ancient times (possibly Syria)',
      description: 'Damask Roses are ancient garden roses known for their intense, heady fragrance. They produce clusters of semi-double to double flowers in shades of pink and white. The plants are bushy and can reach 4-7 feet in height. They typically bloom once per season, though some varieties are repeat-blooming.',
      uses: ['Perfume production (rose attar)', 'Culinary uses (rose water)', 'Potpourri', 'Traditional medicine', 'Historic gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Grown commercially in Bulgaria, Turkey, Iran, and Morocco for perfume production. Found in historic gardens and botanical collections.',
      history: 'Damask Roses have been cultivated for over 2,000 years, with origins likely in ancient Syria or Persia. They were brought to Europe by Crusaders in the 13th century. The most famous variety, Rosa × damascena, is the primary source of rose attar (rose oil) used in perfumery. The city of Kazanlak in Bulgaria has been the center of Damask Rose cultivation for centuries, producing the world\'s finest rose oil. These roses have deep cultural significance in Middle Eastern, Persian, and European traditions.'
    },
    'Tea Rose': {
      origin: 'China, introduced to Europe in 1800s',
      description: 'Tea Roses are elegant, refined roses known for their delicate, tea-like fragrance and graceful growth habit. They produce large, full blooms with pointed centers and come in soft pastel colors. The plants are tender and prefer warm climates, though they can be grown in containers in cooler regions.',
      uses: ['Cut flowers', 'Container gardening', 'Formal gardens', 'Fragrant gardens', 'Greenhouse cultivation'],
      whereToFind: 'Available from specialty rose nurseries, particularly those focusing on heritage roses. Popular in warm climates and greenhouse collections. Common in historic gardens and botanical collections.',
      history: 'Tea Roses originated in China and were introduced to Europe in the early 1800s, with the first being "Hume\'s Blush Tea-scented China" in 1809. They were named for their fragrance, which was said to resemble the scent of a freshly opened tea chest. Tea Roses revolutionized rose breeding by introducing the genes for repeat-blooming and the modern rose form. They were crossed with European roses to create Hybrid Teas, the foundation of modern rose breeding. Despite their tenderness, Tea Roses remain beloved for their elegance and fragrance.'
    },
    'Polyantha Rose': {
      origin: 'France, 1875',
      description: 'Polyantha Roses are compact, bushy plants that produce large clusters of small flowers throughout the growing season. They are extremely hardy, disease-resistant, and low-maintenance. The flowers are typically 1-2 inches in diameter and come in a wide range of colors. These roses are perfect for borders and mass plantings.',
      uses: ['Garden borders', 'Mass plantings', 'Low-maintenance gardens', 'Container gardening', 'Public parks'],
      whereToFind: 'Widely available in nurseries and garden centers. Popular in public gardens, commercial landscapes, and home gardens throughout temperate regions worldwide.',
      history: 'Polyantha Roses were first introduced in 1875 by French breeder Jean-Baptiste Guillot with the variety "Paquerette". They were created by crossing Rosa multiflora with dwarf China roses. The name "Polyantha" means "many-flowered" in Greek, reflecting their profuse blooming habit. These roses were extremely popular in the late 19th and early 20th centuries and were later used in breeding programs to create Floribunda roses. Their hardiness and continuous blooming made them favorites for public gardens and commercial landscapes.'
    },
    'Bourbon Rose': {
      origin: 'Réunion Island (formerly Île Bourbon), 1817',
      description: 'Bourbon Roses are old garden roses known for their strong, sweet fragrance and repeat-blooming habit. They produce large, full, cupped flowers in shades of pink, red, and white. The plants are vigorous and can reach 4-8 feet in height. They have a distinctive, rich fragrance that combines elements of Damask and China roses.',
      uses: ['Fragrant gardens', 'Heritage gardens', 'Cut flowers', 'Perfume production', 'Historic gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, botanical collections, and rose gardens throughout Europe and North America.',
      history: 'Bourbon Roses originated on Réunion Island (then called Île Bourbon) in the Indian Ocean around 1817. They are believed to be natural hybrids between China roses and Damask roses that occurred on the island. The first recognized Bourbon was "Rose Edouard" discovered by a French botanist. These roses were introduced to Europe in the 1820s and became extremely popular for their repeat-blooming habit and strong fragrance. Bourbon roses played a crucial role in rose breeding, contributing to the development of Hybrid Perpetuals and modern roses.'
    },
    'China Rose': {
      origin: 'China, ancient times',
      description: 'China Roses are the foundation of modern rose breeding, known for their repeat-blooming habit and wide color range. They produce elegant, single to double flowers with a delicate fragrance. The plants are compact, typically 2-4 feet tall, with glossy, dark green foliage. They are tender and prefer warm climates but can be grown in containers.',
      uses: ['Breeding programs', 'Container gardening', 'Warm climate gardens', 'Heritage gardens', 'Greenhouse cultivation'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose collections. Found in botanical gardens, historic gardens, and warm climate regions. Popular in China, Southeast Asia, and greenhouse collections.',
      history: 'China Roses (Rosa chinensis) have been cultivated in China for over 1,000 years, with records dating back to the Song Dynasty. They were introduced to Europe in the late 18th century, revolutionizing rose breeding by introducing the genes for repeat-blooming. Before China roses, European roses bloomed only once per season. The introduction of repeat-blooming genes from China roses led to the development of all modern repeat-blooming roses, including Hybrid Teas, Floribundas, and Grandifloras. The most famous China rose is "Old Blush", which remains popular today.'
    },
    'Gallica Rose': {
      origin: 'Europe and Western Asia, ancient times',
      description: 'Gallica Roses, also known as French Roses, are among the oldest cultivated roses. They produce fragrant, semi-double to double flowers in shades of pink, red, and purple. The plants are compact, typically 3-4 feet tall, with rough, dark green foliage. They bloom once per season in early summer and produce attractive rose hips in autumn.',
      uses: ['Heritage gardens', 'Medicinal uses', 'Rose hip harvesting', 'Historic gardens', 'Dye production'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, botanical collections, and medieval gardens throughout Europe. Popular in France, where they are known as "Roses of Provins".',
      history: 'Gallica Roses (Rosa gallica) have been cultivated since ancient times, with evidence of cultivation dating back to the Greeks and Romans. They were extensively grown in medieval Europe, particularly in France, where the town of Provins became famous for rose cultivation. The Apothecary\'s Rose (Rosa gallica officinalis) was grown in monastery gardens for medicinal purposes. Gallica roses were used to make rose water, perfumes, and medicines. They are one of the parent species of many old garden roses and have deep cultural significance in European history.'
    },
    'Moss Rose': {
      origin: 'France, early 1700s',
      description: 'Moss Roses are unique old garden roses characterized by their mossy, resinous growth on the stems and sepals. This "moss" is actually glandular hairs that emit a pine-like fragrance when touched. They produce fragrant, double flowers in various colors and bloom once per season. The mossy covering gives them a distinctive, antique appearance.',
      uses: ['Heritage gardens', 'Fragrant gardens', 'Cut flowers', 'Historic gardens', 'Collector gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, botanical collections, and rose gardens specializing in old garden roses. Popular in France and England.',
      history: 'Moss Roses are sports (mutations) of other rose types, particularly Centifolia and Damask roses. The first moss rose was discovered in France in the early 1700s as a mutation of a Centifolia rose. The variety "Common Moss" (Rosa centifolia muscosa) became extremely popular in the 19th century. The mossy growth was highly prized for its unique appearance and fragrance. Victorian gardeners were particularly fond of moss roses, and many varieties were developed during this period. Today, they are treasured by heritage rose enthusiasts for their unique characteristics.'
    },
    'Rambler Rose': {
      origin: 'Various, 1800s',
      description: 'Rambler Roses are vigorous, fast-growing climbers that can reach 15-30 feet in height. They produce massive displays of small to medium-sized flowers in large clusters, typically blooming once per season in early summer. The plants are extremely hardy and can quickly cover large structures. They have flexible canes that are easy to train.',
      uses: ['Large structures', 'Arbors and pergolas', 'Fences and walls', 'Natural landscaping', 'Wildlife gardens'],
      whereToFind: 'Available from nurseries specializing in climbing roses. Common in large gardens, estates, and public parks. Popular in England, where they are extensively used in country gardens.',
      history: 'Rambler Roses became popular in the late 1800s and early 1900s, with many varieties developed from species roses like Rosa wichurana and Rosa multiflora. The famous "American Pillar" rambler, introduced in 1902, became one of the most popular roses of its time. Ramblers were extensively used in Victorian and Edwardian gardens to create romantic, cottage-style effects. They fell out of favor in the mid-20th century but have experienced a resurgence in recent years as gardeners seek low-maintenance, disease-resistant roses for large-scale plantings.'
    },
    'Groundcover Rose': {
      origin: 'Various, 1980s',
      description: 'Groundcover Roses are low-growing, spreading roses that form dense mats of foliage and flowers. They typically grow 1-3 feet tall and spread 3-6 feet wide. They produce continuous blooms throughout the season and are extremely disease-resistant and low-maintenance. Perfect for slopes, banks, and areas where maintenance is difficult.',
      uses: ['Slopes and banks', 'Mass plantings', 'Erosion control', 'Low-maintenance landscapes', 'Commercial landscapes'],
      whereToFind: 'Widely available in nurseries and garden centers. Popular in commercial landscapes, public parks, and residential gardens. Common in modern landscaping projects.',
      history: 'Groundcover Roses were developed in the 1980s and 1990s as part of the movement toward low-maintenance, disease-resistant roses. Breeders like Meilland in France and Kordes in Germany developed many of the early varieties by crossing compact roses with hardy species. The "Flower Carpet" series, introduced in the 1990s, revolutionized the category with its exceptional disease resistance and continuous blooming. Groundcover roses have become increasingly popular as gardeners seek sustainable, low-maintenance landscaping solutions.'
    },
    'Patio Rose': {
      origin: 'United Kingdom, 1980s',
      description: 'Patio Roses are compact, bushy roses that are larger than miniatures but smaller than standard roses, typically growing 12-18 inches tall. They produce continuous blooms throughout the season and are perfect for containers, small gardens, and borders. They combine the charm of miniature roses with the vigor and flower size of larger roses.',
      uses: ['Container gardening', 'Small gardens', 'Garden borders', 'Balcony gardens', 'Patio displays'],
      whereToFind: 'Widely available in nurseries and garden centers, especially as potted plants. Popular in container gardening sections and small space gardening. Common in urban gardens and patios.',
      history: 'Patio Roses were developed in the 1980s as a response to the growing popularity of container gardening and small-space gardening. British rose breeder Harkness Roses is credited with popularizing the term "Patio Rose" with their introduction of compact, repeat-blooming varieties. These roses were created by crossing miniature roses with larger varieties to achieve the perfect size for containers. The category has grown significantly, with many breeders now offering patio rose collections designed specifically for modern, space-conscious gardeners.'
    },
    'Alba Rose': {
      origin: 'Europe, ancient times',
      description: 'Alba Roses are ancient garden roses known for their pure white to pale pink flowers and exceptional hardiness. They produce fragrant, semi-double to double flowers once per season in early summer. The plants are tall, typically 5-8 feet, with blue-green foliage that is highly disease-resistant. They are among the hardiest of all roses.',
      uses: ['Heritage gardens', 'Cold climate gardens', 'Historic gardens', 'Cottage gardens', 'Medieval gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, botanical collections, and gardens specializing in old roses. Popular in northern Europe and cold climate regions.',
      history: 'Alba Roses (Rosa × alba) are believed to be ancient hybrids, possibly dating back to Roman times. The name "Alba" means "white" in Latin, referring to their characteristic white or pale pink flowers. They have been cultivated in Europe for centuries and are mentioned in medieval herbals and garden books. Alba roses were particularly valued for their hardiness and were grown in monastery gardens throughout Europe. The most famous variety is "Alba Maxima" (Great White Rose), which has been grown for over 500 years. These roses have deep cultural significance and are associated with purity and the Virgin Mary in Christian tradition.'
    },
    'Centifolia Rose': {
      origin: 'Netherlands, 16th-17th century',
      description: 'Centifolia Roses, also known as Cabbage Roses or Provence Roses, are famous for their extremely full, globular flowers with hundreds of petals. They produce large, fragrant blooms in shades of pink, once per season in early summer. The plants are tall, typically 4-6 feet, with arching canes and rough foliage. They have an intense, heady fragrance.',
      uses: ['Perfume production', 'Heritage gardens', 'Cut flowers', 'Historic gardens', 'Fragrant gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, particularly in France and the Netherlands. Grown commercially in the Grasse region of France for perfume production.',
      history: 'Centifolia Roses were developed in the Netherlands during the 16th and 17th centuries, likely from complex crosses involving Gallica, Damask, and Alba roses. The name "Centifolia" means "hundred-leaved" in Latin, referring to their many petals. They became extremely popular in the 18th and 19th centuries, particularly in France, where they were extensively grown for perfume production in the Grasse region. The "Rose de Mai" (May Rose) is still grown commercially for the perfume industry. Centifolia roses were favorite subjects of Dutch and Flemish still-life painters and have deep cultural associations with romance and beauty.'
    },
    'Rugosa Rose': {
      origin: 'East Asia (Japan, Korea, China), ancient times',
      description: 'Rugosa Roses are extremely hardy, disease-resistant roses known for their wrinkled (rugose) foliage and large, attractive rose hips. They produce fragrant, single to semi-double flowers in shades of pink, white, and purple, blooming continuously throughout the season. The plants form dense, thorny shrubs 4-6 feet tall and are highly tolerant of poor soil, salt spray, and cold temperatures.',
      uses: ['Hedging', 'Coastal gardens', 'Rose hip harvesting', 'Wildlife gardens', 'Low-maintenance landscapes'],
      whereToFind: 'Widely available in nurseries, especially those specializing in hardy plants. Common in coastal regions, northern climates, and public parks. Popular in Japan, Korea, and northern Europe.',
      history: 'Rugosa Roses (Rosa rugosa) are native to eastern Asia, particularly Japan, Korea, and northeastern China. They have been cultivated in these regions for centuries. The species was introduced to Europe and North America in the late 19th century and quickly gained popularity for its exceptional hardiness and disease resistance. Rugosa roses are one of the few rose species that are truly salt-tolerant, making them ideal for coastal gardens. They produce the largest and most nutritious rose hips of any rose species, rich in vitamin C, and have been used for food and medicine in Asia for thousands of years.'
    },
    'Noisette Rose': {
      origin: 'United States (South Carolina), 1811',
      description: 'Noisette Roses are climbing or bushy roses known for their clusters of small to medium-sized, fragrant flowers. They produce continuous blooms throughout the season in shades of pink, white, yellow, and orange. The plants are vigorous and can reach 8-15 feet as climbers or 4-6 feet as shrubs. They have a light, sweet fragrance and are relatively tender, preferring warm climates.',
      uses: ['Climbing structures', 'Warm climate gardens', 'Fragrant gardens', 'Heritage gardens', 'Container gardening'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Popular in warm climates, particularly in the southern United States. Found in historic gardens and botanical collections.',
      history: 'Noisette Roses were the first class of roses to be developed in America. They were created in 1811 by John Champneys of Charleston, South Carolina, who crossed a China rose with a Musk rose. The resulting seedlings were given to Philippe Noisette, a French nurseryman, who sent them to his brother Louis in France. Louis Noisette further developed and popularized these roses, and they were named in his honor. Noisette roses were extremely popular in the 19th century, particularly in the American South and in France. They represent an important chapter in American rose breeding history and are treasured by heritage rose enthusiasts.'
    },
    'Portland Rose': {
      origin: 'Italy, late 18th century',
      description: 'Portland Roses are compact, repeat-blooming old garden roses that combine the fragrance of Damask roses with the repeat-blooming habit of China roses. They produce fragrant, double flowers in shades of pink, red, and purple. The plants are typically 3-4 feet tall with a bushy, compact habit. They are more cold-hardy than Tea roses and were important in the development of Hybrid Perpetuals.',
      uses: ['Heritage gardens', 'Compact gardens', 'Fragrant gardens', 'Historic gardens', 'Small spaces'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, particularly in England and Italy. Popular in collections of old garden roses.',
      history: 'Portland Roses are named after the Duchess of Portland, who received a rose from Italy in the late 18th century. This rose, known as "Portland Rose" or "Duchess of Portland", was a natural hybrid that combined the best traits of Damask and China roses. Portland roses became the foundation for breeding Hybrid Perpetual roses in the mid-19th century, which in turn led to the development of Hybrid Tea roses. They were extremely popular in Victorian gardens for their compact size, fragrance, and repeat-blooming habit. The Portland class represents an important bridge between old and modern roses in rose breeding history.'
    },
    'Hybrid Perpetual Rose': {
      origin: 'France, 1830s-1840s',
      description: 'Hybrid Perpetual Roses are tall, vigorous roses that were the dominant garden roses of the Victorian era. They produce large, fragrant, double flowers in shades of pink, red, purple, and white. The plants are typically 4-6 feet tall with a bushy, upright habit. While called "Perpetual", most varieties bloom primarily in spring and early summer with occasional repeat blooms, though some modern varieties bloom more continuously.',
      uses: ['Heritage gardens', 'Victorian gardens', 'Cut flowers', 'Fragrant gardens', 'Historic gardens'],
      whereToFind: 'Available from specialty rose nurseries and heritage rose growers. Found in historic gardens, particularly Victorian-era gardens. Popular in England, France, and North America in heritage rose collections.',
      history: 'Hybrid Perpetual Roses were developed in France in the 1830s and 1840s by crossing Portland roses with China roses and other old garden roses. The term "Perpetual" referred to their ability to bloom more than once per season, a trait inherited from their China rose ancestors. They became the most popular roses of the Victorian era, with thousands of varieties developed. Famous varieties like "La Reine" (1842) and "American Beauty" (1886) became iconic. Hybrid Perpetuals dominated rose gardens until the introduction of Hybrid Tea roses in the late 19th century. They represent the pinnacle of 19th-century rose breeding and are treasured for their fragrance and old-fashioned charm.'
    },
    'Landscape Rose': {
      origin: 'Various, 1990s-present',
      description: 'Landscape Roses are modern, low-maintenance roses bred specifically for landscape use. They are extremely disease-resistant, require minimal pruning, and bloom continuously throughout the season. The plants are typically compact, 2-4 feet tall and wide, with a mounding habit. They produce clusters of flowers in a wide range of colors and are designed for mass plantings and commercial landscapes.',
      uses: ['Commercial landscapes', 'Mass plantings', 'Low-maintenance gardens', 'Public parks', 'Roadside plantings'],
      whereToFind: 'Widely available in nurseries and garden centers. Extremely popular in commercial landscapes, public parks, and residential gardens. Common in modern landscaping projects worldwide.',
      history: 'Landscape Roses represent the latest evolution in rose breeding, developed since the 1990s with a focus on disease resistance, low maintenance, and landscape performance. Major breeding programs by companies like Proven Winners, Star Roses, and Weeks Roses have created series like "Knock Out", "Drift", "Oso Easy", and "Flower Carpet". These roses were bred to be "self-cleaning" (petals fall cleanly), require minimal or no spraying, and provide continuous color. Landscape roses have revolutionized rose gardening by making roses accessible to gardeners who want beautiful flowers without the traditional maintenance requirements. They represent the future of sustainable rose gardening.'
    }
  };

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  getRoseInfo(): RoseInfo | undefined {
    if (!this.housingLocation) {
      return undefined;
    }
    const info = this.roseInfoMap[this.housingLocation.name];
    if (info && !info.careInfo) {
      info.careInfo = this.getDefaultCareInfo();
    }
    return info;
  }

  private getDefaultCareInfo() {
    return {
      location: 'Outdoor garden beds or containers. Best in areas with good air circulation and protection from strong winds.',
      temperature: 'Ideal: 60-75°F (15-24°C). Most roses tolerate 20-85°F (-7 to 29°C) with proper care.',
      soil: 'Well-draining, fertile soil with pH 6.0-7.0. Add compost or organic matter for best growth.',
      watering: 'Water deeply 1-2 times per week. Keep soil consistently moist but not waterlogged. Water at base of plant.',
      sunlight: 'Full sun (6+ hours daily). Morning sun is preferred to help dry morning dew.',
      humidity: 'Moderate humidity (40-60%). Ensure good air circulation to prevent fungal issues.'
    };
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addToCart() {
    if (this.housingLocation) {
      this.cartService.addToCart(this.housingLocation);
      this.addedToCart = true;
      setTimeout(() => {
        this.addedToCart = false;
      }, 2000);
    }
  }

  orderNow() {
    if (this.housingLocation) {
      this.cartService.addToCart(this.housingLocation);
      this.router.navigate(['/']);
    }
  }
}
