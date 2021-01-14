# Downloading

If you want to create an export from your CouchSuring download, or a more
"permanent" archive, you can use some of these scripts to achieve that.

## Notes

- The script is pretty rough, but functional.
- This was run on Ubuntu, it hasn't been tested on any other operating system,
  and due to grep weirdness it might not work on MacOS.
- Please improve it and send me your pull requests!

## Friend data

The CS JSON export only includes your friends CouchSurfing profile URLs. That's
kinda useless. If you want to get more information and save it about them,
their usernames, pictures, etc, you can use this process.

Firstly, you need to extract a list of all your friend IDs from the JSON file.

For this process, we'll call your CouchSurfing export file `cs.json`, but it's
more likely named something like `123456-202001011200.json`.

```sh
cat cs.json | grep '"profile"' | grep -oE '/users/[0-9]+"' | grep -oE [0-9]+ > friends_ids.txt
```

Now we'll download one file for each friend, and save them into a folder called
`friends/` with a name like `123.html` where `123` is their CouchSurfing user
id. You need the `getFriend.sh` script from this folder. Once you have that,
you can do the following:

```sh
mkdir friends
cat friends_ids.txt | xargs -n1 ./getFriend.sh
```

Now we can download all our friends first images. This is pretty hacky. But it
might work. Some of these images can be huge, like 10MB, so be prepared to
download quite some amount of data if you have a lot of friends. You need the
`getFriendImages.sh` script from this folder for this.

```sh
ls friends/*.html | xargs -n1 ./getFriendImages.sh`
```

At this point, you should have a folder called `friends/` which contains one
HTML file for each friend, and then one image for each friend. Both named
`friend_id.html` and `friend_id.jpg` respectively. At this point, you've
captured the essential data for your CouchSurfing friend list.

If you want to work on a more eloborate export, something that would
potentially render your friends, messages, and other exported data into
markdown files in a clean and simple format, jump in on
[discussion](https://github.com/simison/couchspinner/issues/5).
