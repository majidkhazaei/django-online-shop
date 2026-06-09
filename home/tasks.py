from bucket import bucket


def get_all_bucket_objects():
    results = bucket.get_objects()
    return results