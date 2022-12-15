import 'dart:convert';

class Trial {
  String image;
  String title;
  int id;
  Trial({
    required this.id,
    required this.image,
    required this.title,
  });

  Trial copyWith({
    String? image,
    String? title,
  }) {
    return Trial(
      id: id,
      image: image ?? this.image,
      title: title ?? this.title,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'image': image,
      'title': title,
      'id': id,
    };
  }

  factory Trial.fromMap(Map<String, dynamic> map) {
    return Trial(
      id: map['id'] ?? '',
      image: map['image'] ?? '',
      title: map['title'] ?? '',

    );
  }

  String toJson() => json.encode(toMap());

  factory Trial.fromJson(String source) => Trial.fromMap(json.decode(source));

  @override
  String toString() => 'Trial(image: $image, title: $title)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Trial && other.image == image && other.title == title;
  }

  @override
  int get hashCode => image.hashCode ^ title.hashCode;
}
